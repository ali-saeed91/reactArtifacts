import { Storage } from 'aws-amplify';

export async function s3upload(file) {
  const filename = `${Date.now()}-${file.name}`;
  const stored = await Storage.valut.put(filename, file, {
    contentType: file.type
  });
  return stored.key;
}


state = {
  fileUrl: '',
  file: '',
  filename: ''
}

handleChange = e => {
  const file = e.target.files[0]
  this.setState({
    fileUrl: URL.createObjectURL(file),
    file,
    filename: file.name
  })
}

saveFile = () => {
  Storage.put(this.state.filename, this.state.file)
    .then(() => {
      console.log('Successfully saved file')
      this.setState({ fileUrl: '', file: '', filename: '' })
    })
    .catch(err => {
      console.log('error uploading file', err)
    })
}

render() {
  return (
  <input type='file' onChange={this.handleChange} />
  <img src={this.state.fileUrl} />
  <button onClick={this.saveFile}>Save File</button>
  )
}


<form id="upload" enctype="multipart/form-data" method="post" action="https://upload.vastushastra.io">
<input type="file" data-toggle="tooltip" data-bs-tooltip="" class="btn-lg" name="floor_plan" accept="application/pdf, image/*" title="5 MB file size limit" required="">
<button class="btn btn-primary btn-lg" type="submit" style="margin-right: 0px;">Upload</button>
</form>


        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span">
          Upload
        </Button>
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>