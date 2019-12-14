import { Component, Prop, h, State } from '@stencil/core';
// import { AwAlertInterface } from './Aw-AlertInterface';
// import { format } from '../../utils/utils';

@Component({
  tag: 'alert-component',
  styleUrl: 'alert-component.scss',
  shadow: true
})
export class MyComponent {

  @State() acknowledged: boolean = false;
  @Prop() type: 'mega' | 'info' | 'error' | 'success' = 'info';
  @Prop() message: string = 'This is an important alert';

  componentWillLoad() {
    this.getText = this.getText.bind(this);
    this.handleAcknowledged = this.handleAcknowledged.bind(this);
  }


  handleAcknowledged() {
    console.log(this)
    this.acknowledged = true;
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
      <button
        onClick={
          this.handleAcknowledged
        }>
        Acknowledged
      </button>
    </div>;
  }
}
