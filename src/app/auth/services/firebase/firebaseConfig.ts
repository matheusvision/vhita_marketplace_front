const prodConfig = {
	apiKey: 'AIzaSyC3dTEzlmsam_nCeQ3hkiPPRzwoAbo7JR8',
	authDomain: 'fuse-react.firebaseapp.com',
	databaseURL: 'https://fuse-react.firebaseio.com',
	projectId: 'fuse-react',
	storageBucket: 'fuse-react.appspot.com',
	messagingSenderId: '864155729955',
	appId: '1:864155729955:web:c5e88e2570821ff4943196'
	// apiKey           : "YOUR_API_KEY",
	// authDomain       : "your-app.firebaseapp.com",
	// databaseURL      : "https://your-app.firebaseio.com",
	// projectId        : "your-app",
	// storageBucket    : "your-app.appspot.com",
	// messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
};

const devConfig = {
	apiKey: 'AIzaSyC3dTEzlmsam_nCeQ3hkiPPRzwoAbo7JR8',
	authDomain: 'fuse-react.firebaseapp.com',
	databaseURL: 'https://fuse-react.firebaseio.com',
	projectId: 'fuse-react',
	storageBucket: 'fuse-react.appspot.com',
	messagingSenderId: '864155729955',
	appId: '1:864155729955:web:c5e88e2570821ff4943196'

	// apiKey           : "YOUR_API_KEY",
	// authDomain       : "your-app.firebaseapp.com",
	// databaseURL      : "https://your-app.firebaseio.com",
	// projectId        : "your-app",
	// storageBucket    : "your-app.appspot.com",
	// messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
};

const firebaseConfig = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default firebaseConfig;
