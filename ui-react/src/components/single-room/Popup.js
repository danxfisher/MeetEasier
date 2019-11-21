import React from 'react';

class Popup extends React.Component {
    render(){
        return (
            <div class='popupNotification'>
                <div class='popupNotification inner'> 
                    <h1>{this.props.text}</h1>
                </div>
            </div>
        );
    }
}

export default Popup;       