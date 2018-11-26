function cloneAttachmentsToFolder(threadMessage, attachments, folderId){
  attachments.forEach(function(attachment){
    var attachmentBlob = attachment.copyBlob();
    var folder = DriveApp.getFolderById(folderId);

    var createdFile = folder.createFile(attachmentBlob);
    createdFile.setDescription(threadMessage.getDate().toDateString() + "\n\n\n" + threadMessage.getBody());

    console.info("File %s created under %s", createdFile.getName(), folder.getName());
  });
}

function cloneAttachmentsToDrive(label, folderId){
  var statementLabel = GmailApp.getUserLabelByName(label);
  var attachmentProcessedLabel = GmailApp.getUserLabelByName(ATTACHMENT_PROCESSED_LABEL);

  if(attachmentProcessedLabel == undefined){
    attachmentProcessedLabel = GmailApp.createLabel(ATTACHMENT_PROCESSED_LABEL);
  }

  var threadIndex = 0;
  var threadRange = 100;

  var cloneStartTimeDate = new Date();

  while(true){
    if(isTimeUp_(cloneStartTimeDate)){
      console.error("Over Time. Need some break");
      break;
    }

    var threads = statementLabel.getThreads(threadIndex, threadRange);

    if(threads.length > 0){
      var unProcessedThreads = getUnprocessedThreads(threads);
      var msgs = GmailApp.getMessagesForThreads(unProcessedThreads);

      for (var i = 0 ; i < msgs.length; i++) {
        for (var j = 0; j < msgs[i].length; j++) {
          var threadMessage = msgs[i][j];
          var attachments = threadMessage.getAttachments();

          cloneAttachmentsToFolder(threadMessage, attachments, folderId);
          threadMessage.getThread().addLabel(attachmentProcessedLabel);
        }
      }
    } else {
      break;
    }

    threadIndex = threadIndex + threadRange;
  }
}
