import React from 'react';
import Flash from '../../lib/Flash';

class FlashMessages extends React.Component {

  state = {}

  componentDidUpdate() {
    console.log('FlashMessages did update...');
    const messages = Flash.getMessages();

    // If there are no Flash messages...
    if(!messages) return false;

    this.setState({ messages });
    Flash.clearMessages();

    setTimeout(() => this.setState({messages: null}), 3000);
  }

  render() {
    const messages = this.state.messages;
    return(
      <section>
        {messages && messages.map((message, i) =>
          <div key={i}>
            { message.content }
          </div>
        ) }
      </section>
    );
  }
}

export default FlashMessages;
