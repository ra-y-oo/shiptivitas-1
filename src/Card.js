import React from 'react';
    import './Card.css';
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3912560361.
    import {v4 as uuidv4} from 'uuid';

    export default class Card extends React.Component {
      getCardClassName() {
        let className = '';
        if (this.props.status === 'backlog') {
          className = 'Card-grey';
        } else if (this.props.status === 'in-progress') {
          className = 'Card-blue';
        } else if (this.props.status === 'complete') {
          className = 'Card-green';
        }
        return className;
      }

      render() {
        const uniqueId = this.props.id ? `${this.props.id}-${uuidv4()}` : uuidv4(); 

        return (
          <div 
            className={`Card ${this.getCardClassName()}`} 
            data-id={uniqueId} 
            data-status={this.props.status} 
          >
            <div className="Card-title">{this.props.name}</div>
          </div>
        );
      }
    }
