function initializeAttachmentProcessor() {
  var cloneStartTimeDate = new Date();
    
  ATTACHMENT_MAILS_CONFIG.forEach(function(attachmentMailConfig){
    if(isTimeUp_(cloneStartTimeDate)){
      Logger.log("Over Time. Need some break");
      return;
    }
    
    var label = attachmentMailConfig.label;
    var folderId = attachmentMailConfig.folderId;
    
    cloneAttachmentsToDrive(label, folderId);
  });
}
