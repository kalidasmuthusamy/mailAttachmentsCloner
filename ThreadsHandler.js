function getUnprocessedThreads(threads){
  var unProcessedThreads = threads.filter(function(thread){
    var threadLabels = thread.getLabels().map(function(threadLabel){
      return threadLabel.getName();
    });
    
    return threadLabels.indexOf(ATTACHMENT_PROCESSED_LABEL) == -1;
  });
  
  return unProcessedThreads;
}


function markUnprocessedThreadsAsProcessed(unProcessedThreads, attachmentProcessedLabel){
  unProcessedThreads.forEach(function(unProcessedThread){
    unProcessedThread.addLabel(attachmentProcessedLabel);
  });
}


