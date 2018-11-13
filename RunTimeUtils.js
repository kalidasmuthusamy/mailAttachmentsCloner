function isTimeUp_(start) {
  var now = new Date();
  return now.getTime() - start.getTime() > 240000; // 4 minutes
}