const courseData = { /* ऊपर दिया गया JSON यहाँ डालें */ };

// Arithmetic के सभी वीडियो प्राप्त करने के लिए:
const arithmeticVideos = courseData.subjects["Arithmetic"];
console.log(arithmeticVideos[0].url); // आउटपुट: https://selectionwayrecordedmp4.hranker.com/561/692d0419dd258fd3235d0129/hls/master.m3u8

// कुल वीडियो की संख्या देखने के लिए:
console.log(courseData.total_video_classes); // आउटपुट: 362