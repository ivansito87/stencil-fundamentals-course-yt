import { Component, Prop, h, State, Event, EventEmitter, Listen } from '@stencil/core';
import { AwAlertInterface } from './alert-component.interface';
// import { format } from '../../utils/utils';

@Component({
  tag: 'alert-component',
  styleUrl: 'alert-component.scss',
  shadow: true
})
export class MyComponent {


  @State() acknowledged: boolean = false;
  @Prop() type: 'mega' | 'info' | 'error' | 'success' = 'info';
  @Prop({ mutable: false }) message: string = 'This is an important alert';
  // the event emited is the type Date as per the interface
  @Event() acknowledgeEvent: EventEmitter<AwAlertInterface>;

  componentWillLoad() {
    this.getText = this.getText.bind(this);
    this.handleAcknowledged = this.handleAcknowledged.bind(this);
  }

  /*

  This is a way of handling events with normal HTML elements

   handleAcknowledged() {
    this.acknowledged = true;
    
    Emits an event to the HTML Page that we can listen to we have to look for the word acknowledgeEvent '
    this will be recieved in the detail property inside of the dom in HTML
    
    this.acknowledgeEvent.emit({
      when: new Date(),
    })
  } */


  // Implementing the listen event to allow the user to interact with the host element
  // In this case the listen is to hear things from the consumer of the component 
  @Listen('click')

  handleAcknowledged() {
    this.acknowledged = true;
    // Emits an event to the HTML Page that we can listen to we have to look for the word acknowledgeEvent '
    // this will be recieved in the detail property inside of the dom in HTML
    this.acknowledgeEvent.emit({
      when: new Date(),
    })
  }

  private getText(): string {
    return this.message;
  }

  private getCssClass(): string {
    console.log(`${this.type} ${this.acknowledged ? 'acknowledged' : ''}`);

    return `${this.type} ${this.acknowledged ? 'acknowledged' : ''}`;
  }

  render() {
    return <div class={this.getCssClass()}>
      {this.getText()}
      {/*<button
        class={'acknowledged-button'}
        onClick={                        <<<---<<<   BEFORE
          this.handleAcknowledged
        }>
        Acknowledged
      </button>*/}
      <span
        class={'acknowledged-button'}
        onClick={
          this.handleAcknowledged         // <<<---<<<   AFTER
        }>
        Acknowledged
      </span>
    </div>;
  }
}
