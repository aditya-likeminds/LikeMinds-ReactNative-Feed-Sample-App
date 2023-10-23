import { getAWS } from "./AWSConfig";

// this function uploads the media on AWS S3 bucket
export const uploadFilesToAWS = async (media: LMAttachmentMetaUI, userUniqueId: string) => {
  const response = await fetch(media?.url ? media.url : '');
  const blob = await response.blob();
  let mediaObject = getAWS()
    .upload({
      Key: `files/post/${userUniqueId}/${media.name}`,
      Bucket: `${process.env.S3_BUCKET}`,
      Body: blob,
      ACL: `public-read-write`,
      ContentType: media.format,
    })
    .on('httpUploadProgress', function (progress) {
      Math.round((progress.loaded / progress.total) * 100);
    });
  return mediaObject.promise();
};