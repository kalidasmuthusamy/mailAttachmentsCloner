function initializeAttachmentProcessor() {
  var cloneStartTimeDate = new Date();

  console.info("Attachments Processing Started On %s", new Date());

  ATTACHMENT_MAILS_CONFIG.forEach(function(attachmentMailConfig){
    if(isTimeUp_(cloneStartTimeDate)){
      console.error("Over Time. Need some break");
      return;
    }

    var label = attachmentMailConfig.label;
    var folderId = attachmentMailConfig.folderId;

    cloneAttachmentsToDrive(label, folderId);
  });

  console.info("Attachments Processing Ended On %s", new Date());
}
