export default {
  dropboxOptions() {
    return {
      url: 'http://localhost:5000/api/upload',
      createImageThumbnails: false,
      maxFilesize: 0.5,
      acceptedFiles: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      dictDefaultMessage: 'Drop files here or click to upload'
    }
  }
}



