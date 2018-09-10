const Flash = {};

// we start with null
// if we started with an array then this.state.messages will always be true (in the FlashMessages file)
Flash.messages = null;

Flash.setMessage = function(type, content) {
  // Create an empty aray if this.message is null
  this.messages = this.messages || [];
  this.messages.push({ type, content });
};

// return the messages array
Flash.getMessages = function() {
  return this.messages;
};

// reset the array to an empty one
Flash.clearMessages = function() {
  this.messages = null;
};

export default Flash;
