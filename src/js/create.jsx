import React from 'react';

export default class Create extends React.Component {
  constructor() {
    super();

    this.state = {
      invites: [],
      index: 0,
    };

    this.addInvite = this.addInvite.bind(this);
  }

  addInvite() {
    this.setState({
      invites: this.state.invites.concat({
        id: this.state.index,
        name: '',
        phoneNumber: ''
      }),
      index: this.state.index + 1
    });
    console.log(this.state);
  }

  render() {
    return (
      <div>
				<h1>Create a Petition!</h1>
        <label htmlFor="name">Your Name</label>
        <input type="text" name="name"/>
        <br/>
        <label htmlFor="name-petition">Title of Petition</label>
        <input type="text" name="name-petition"/>
        <br/>
        <label htmlFor="description">Description</label>
        <input type="text" name="description"/>
        <button onClick={this.addInvite}>Add Invite</button>
        {
          this.state.invites.map((invite) => (
            <div key={invite.id}>
              <br/>
              <label htmlFor="name-invite">Name</label><input type="text" name="name-invite" value={invite.name}/>
              <label htmlFor="phone-number">Phone Number</label><input type="text" name="phone-number" value={invite.phoneNumber}/>
            </div>
          ))
        }
        <br/>
        <button>Submit</button>
			</div>
    )
  }
}
