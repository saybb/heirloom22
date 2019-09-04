This is a back-end authentication component branch.
All files are for learning the implementation of firebase authentication.

First, install firebase tools globally:
```
npm install -g firebase-tools
```

initialise firebase functions locally:
```
npm init functions
```

Recommend useing _index.html_ via __live server__.

For security purposes, please set firebase db rules manually.
```
service cloud.firestore {
match /databases/{database}/documents {
    // match logged in user docs in user collection
    match /users/{userId}{
    	allow create: if request.auth.uid != null;
      allow read: if request.auth.uid == userId;
    }
    
    // match docs in the guids collection
    match /guides/{guideId}{
    	allow read: if request.auth.uid != null;
      allow write: if request.auth.token == true;
    }
  }
}
```
