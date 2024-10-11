
import React from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super
(props);
    const clients = this.getClients();
    this.state = {
      clients: {
        backlog: clients.filter(client => !client.status || client.status === 'backlog'),
        inProgress: clients.filter(client => client.status && client.status === 'in-progress'),
        complete: clients.filter(client => client.status && client.status === 'complete'),
      }
    };
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef()
    };
  }

    // Define getClients()
    getClients() {
      return [
        { id: 1, name: 'Client A', description: 'Client A details', status: 'backlog' },
        { id: 2, name: 'Client B', description: 'Client B details', status: 'backlog' },
        { id: 3, name: 'Client C', description: 'Client C details', status: 'in-progress' },
        { id: 4, name: 'Client D', description: 'Client D details', status: 'in-progress' },
        { id: 5, name: 'Client E', description: 'Client E details', status: 'complete' },
        { id: 6, name: 'Client F', description: 'Client F details', status: 'complete' },
      ];
    }

  

  componentDidMount() {
    this.dragula = Dragula([
      this.swimlanes.backlog.current, 
      this.swimlanes.inProgress.current,
      this.swimlanes.complete.current
    ]);

    this.dragula.on('drop', (el, target, source, sibling) => {
      const cardId = el.getAttribute('data-id');
      const targetLane = target.parentElement.getAttribute('data-lane'); 

      this.handleCardDrop(cardId, targetLane);
    });
  }

  componentWillUnmount() {
    this.dragula.destroy(); 
  }

  handleCardDrop(cardId, targetLane) {
    let newState = { ...this.state };
    let card = null;
    for (let lane in newState.clients) {
      card = newState.clients[lane].find(client => client.id === Number(cardId));
      if (card) {
        newState.clients[lane] = newState.clients[lane].filter(client => client.id
 !== Number(cardId));
        break;
      }
    }
    if (card) {
      card.status = targetLane.toLowerCase(); 
      newState.clients[targetLane.toLowerCase()] = [...newState.clients[targetLane.toLowerCase()], card];
      this.setState(newState);
    }
  }

  renderSwimlane(name, clients, ref) {
    return (
      <Swimlane
        name={name}
        clients={clients}
        dragulaRef={ref}
        data-lane={name}
      />
    );
  }

  // ... (rest of your Board.js code, including getClients and render methods) ...

  render() {
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              {this.renderSwimlane('backlog', this.state.clients.backlog, this.swimlanes.backlog)}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('in-progress', this.state.clients.inProgress, this.swimlanes.inProgress)}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('complete', this.state.clients.complete, this.swimlanes.complete)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
