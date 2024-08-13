const readline = require('readline');
const {exec} = require('child_process');
// const AppName = 'MealOn';

const options = ['Android', 'iOS']; // Android and ios

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

function displayOptions() {
  console.clear();
  console.log('Generate a build:');
  for (let i = 0; i < options.length; i++) {
    console.log(`[${i === 0 ? 'A' : 'I'}] ${options[i]}`);
  }
}

displayOptions();

rl.question('Enter your choice (A/I): ', answer => {
  rl.close();
  const selectedBuild = answer.trim().toLowerCase();
  if (selectedBuild === 'a') {
    executeAndroidBuild();
  } else if (selectedBuild === 'i') {
    executeIOSBuild();
  } else {
    console.log('Invalid choice. Please enter "A" for Android or "I" for iOS.');
  }
});

function executeAndroidBuild() {
  const process = exec(
    `npx react-native bundle --platform android --dev false --entry-file ./index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res/ --sourcemap-output ./android/app/src/main/assets/index.android.map`,
  );

  process.stdout.on('data', data => {
    console.log(data);
  });

  process.stderr.on('data', data => {
    console.error(data);
  });

  process.on('exit', code => {
    if (code === 0) {
      console.log('Successfully Linked Assets');
      generateAndroidDebugBuild();
    } else {
      console.error('Linked Assets failed with code ' + code);
    }
  });
}

function generateAndroidDebugBuild() {
  const androidProcess = exec('cd ./android && ./gradlew clean assembleDebug');

  androidProcess.stdout.on('data', data => {
    console.log(data);
  });

  androidProcess.stderr.on('data', data => {
    console.error(data);
  });

  androidProcess.on('exit', code => {
    if (code === 0) {
      const debugApkPath =
        './android/app/build/outputs/apk/debug/app-debug.apk';
      console.log('Android Debug Build successfully generated at:');
      console.log(debugApkPath);
      openAndroidDebugBuild(debugApkPath);
    } else {
      console.error('Android Debug Build generation failed with code ' + code);
    }
  });
}

function openAndroidDebugBuild(apkPath) {
  const directoryPath = apkPath.substring(0, apkPath.lastIndexOf('/')); // Get the directory path

  const openFinderProcess = exec(`open "${directoryPath}"`);

  openFinderProcess.stdout.on('data', data => {
    console.log(data);
  });

  openFinderProcess.stderr.on('data', data => {
    console.error(data);
  });

  openFinderProcess.on('exit', code => {
    if (code === 0) {
      console.log('Opened Android Debug Build directory in Finder.');
      openDefaultBrowser();
    } else {
      console.error(
        'Failed to open Android Debug Build directory with code ' + code,
      );
    }
  });
}

// IOs build
function executeIOSBuild() {
  const process = exec(
    `npx react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios`,
  );

  process.stdout.on('data', data => {
    console.log(data);
  });

  process.stderr.on('data', data => {
    console.error(data);
  });

  process.on('exit', code => {
    if (code === 0) {
      console.log('Successfully Linked Assets');
      console.log(
        'For iOS, you may need to run "pod install" to complete the build. and run manually',
      );
      createIOSArchive();
    } else {
      console.error('Linked Assets failed with code ' + code);
    }
  });
}

function createIOSArchive() {
  const archiveProcess = exec(
    'xcodebuild archive -workspace ios/Episap.xcworkspace -scheme Episap -archivePath ~/Desktop/Episap.xcarchive',
  );

  archiveProcess.stdout.on('data', data => {
    console.log(data);
  });

  archiveProcess.stderr.on('data', data => {
    console.error(data);
  });

  archiveProcess.on('exit', code => {
    if (code === 0) {
      console.log('iOS archive created successfully.');
      console.log('Now you can use this archive for further distribution.');
    } else {
      console.error('iOS archive creation failed with code ' + code);
    }
  });
}

function openDefaultBrowser() {
  let url = `https://wetransfer.com/`;
  const openBrowserProcess = exec(`open ${url}`);

  openBrowserProcess.stdout.on('data', data => {
    console.log(data);
  });

  openBrowserProcess.stderr.on('data', data => {
    console.error(data);
  });

  openBrowserProcess.on('exit', code => {
    if (code === 0) {
      console.log(`Opened ${url} in the default browser.`);
    } else {
      console.error(`Failed to open ${url} with code ${code}`);
    }
  });
}