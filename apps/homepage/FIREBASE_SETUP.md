# Firebase Setup Guide for AI Tools Platform

## Overview
Firebase has been integrated into your AI tools platform to provide:
- User authentication
- Data storage for AI-generated content
- Analytics for tool usage
- Cloud storage for generated images and files

## Setup Instructions

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Name your project (e.g., "AI Tools Platform")
4. Enable Google Analytics (recommended)
5. Choose or create a Google Analytics account

### 2. Configure Firebase Services

#### Enable Authentication
1. Go to Authentication > Sign-in method
2. Enable Email/Password
3. Enable Google sign-in (recommended)
4. Add authorized domains if deploying to production

#### Enable Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Choose "Start in test mode" (update rules later)
4. Select your region

#### Enable Storage
1. Go to Storage
2. Click "Get started"
3. Choose "Start in test mode"
4. Select your region

### 3. Get Configuration
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click "Add app" > Web app
4. Name your app (e.g., "AI Tools Web")
5. Copy the configuration object

### 4. Add Environment Variables
Create a `.env.local` file in the homepage directory with:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Google AI API Key (already configured)
GOOGLE_AI_API_KEY=AIzaSyDLqdavFp2JxGcDEyifFsXS5eGlfaOUf8A
```

### 5. Firebase Features in AI Tools

#### User Management
- User registration and login
- Save generated content to user accounts
- Usage tracking and analytics

#### Content Storage
- Store AI-generated text content
- Save generated images and files
- User preferences and settings

#### Analytics
- Track tool usage
- Monitor performance
- User engagement metrics

## Security Rules

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // AI generated content
    match /ai-content/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Usage in Code

The Firebase configuration is already set up in `src/lib/firebase.ts`. You can import and use it in your components:

```typescript
import { auth, db, storage } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Example: Save AI-generated content
const saveContent = async (userId: string, content: string) => {
  if (db) {
    await setDoc(doc(db, 'ai-content', 'document-id'), {
      userId,
      content,
      timestamp: new Date(),
      type: 'blog-post'
    });
  }
};
```

## Next Steps

1. Complete Firebase project setup
2. Add authentication UI to AI tools
3. Implement content saving functionality
4. Add user dashboards
5. Set up analytics tracking

The Firebase integration is now ready to enhance your AI tools platform with user accounts, data persistence, and analytics! 