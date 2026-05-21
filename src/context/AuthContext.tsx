'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  role: 'client' | 'admin';
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    import('@/lib/firebase').then(({ auth, db }) => {
      if (!auth || !auth.onAuthStateChanged) {
        setLoading(false);
        return;
      }
      
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setUser(user);
        if (user) {
          try {
            const profileDoc = await getDoc(doc(db, 'users', user.uid));
            if (profileDoc.exists()) {
              setUserProfile(profileDoc.data() as UserProfile);
            }
          } catch (e) {
            console.log('Profile fetch skipped - Firebase not configured');
          }
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  const signUp = async (email: string, password: string, name: string, phone?: string) => {
    const { auth, db } = await import('@/lib/firebase');
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
    
    const profile: UserProfile = {
      uid: user.uid,
      email,
      displayName: name,
      phone: phone || '',
      role: 'client',
      createdAt: new Date(),
    };
    
    await setDoc(doc(db, 'users', user.uid), profile);
    setUserProfile(profile);
  };

  const signIn = async (email: string, password: string) => {
    const { auth } = await import('@/lib/firebase');
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const { auth, db } = await import('@/lib/firebase');
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    
    const profileDoc = await getDoc(doc(db, 'users', user.uid));
    if (!profileDoc.exists()) {
      const profile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        role: 'client',
        createdAt: new Date(),
      };
      await setDoc(doc(db, 'users', user.uid), profile);
      setUserProfile(profile);
    }
  };

  const logout = async () => {
    const { auth } = await import('@/lib/firebase');
    await signOut(auth);
    setUserProfile(null);
  };

  const isAdmin = userProfile?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signUp, signIn, signInWithGoogle, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
