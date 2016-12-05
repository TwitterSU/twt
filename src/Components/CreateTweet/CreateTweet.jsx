import React,{Component} from 'react'
import './CreateTweet.css'
import {Form, Button} from 'semantic-ui-react'

class CreateTweet extends Component {
  render () {
    return (
    <Form onSubmit={this.props.onsubmit.bind(null,this)}
          loading={this.props.loading}
           onKeyUp={this.props.onsubmit.bind(null, this)}
            name='tweetForm'>
      
      <Form.Field>
        <label>New Tweet</label>
        <textarea name='content'  placeholder='Tweet...' />
      </Form.Field>
      <Button type="submit">Tweet</Button>
    </Form>
    )
  }
}
export default CreateTweet
