import  React, { Component } from 'react'
import { Button, Confirm, Form, TextArea,Header, Image, Modal } from 'semantic-ui-react'
class EditNode extends Component {
  state = { open: false, text: this.props.content }
  textChange = (e)=>{
    this.setState({
      text: e.target.value
    })
    
  }
  show = (e) => {
    e.preventDefault()
    console.log(e)
    this.setState({ open: true })
  }
  handleConfirm = (e) => {
    e.preventDefault()
    console.log(this)
    console.log(e.target)
    console.log(this.refs.app)
    this.setState({ open: false })
  }
  handleCancel = (e) => {
    e.preventDefault()
    this.setState({ open: false })
  }
  render() {
    return (
      <Modal trigger={<button
        className='ui right floated button blue'
        style={{'fontSize': '0.75em'}}
        onClick={this.props.edit}
        >
        Edit
      </button>}>
        <Modal.Content image>
          <Image wrapped size='small' src={sessionStorage.getItem('url')} />
          <Modal.Description>
            <Header>Tweet edit</Header>
            <Form>
              <TextArea onChange={this.textChange.bind(this)} defaultValue={this.props.content}>
              </TextArea>
              <Button onClick={this.show}>Confirm</Button>
              <Confirm
                open={this.state.open}
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
  componentDidMount(){
    window.jQuery(this.refs.modal)
      .modal({
        content: this.state.text
      })
      
      
  }
}
export default EditNode