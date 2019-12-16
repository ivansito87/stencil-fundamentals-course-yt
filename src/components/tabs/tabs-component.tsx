import { Component, Prop, h, State, Event, EventEmitter, Listen } from '@stencil/core';
import { AwTabsInterface } from './tabs-component.interface';
// import { format } from '../../utils/utils';

@Component({
  tag: 'tabs-component',
  styleUrl: 'tabs-component.scss',
  shadow: true
})
export class MyComponent {

  @Prop() name: string = 'No prop name Given';
  @Prop() active: boolean;
  @Event() tabActivate: EventEmitter<AwTabsInterface>;
  @Listen('click')
  handleClick() {
    this.active = true;
    this.tabActivate.emit({ name: this.name })
  }

  private getActiveClassCss(): any {
    return `${this.active ? 'tab-style active' : 'tab-style'}`
  }

  render() {
    return (
      <div class={this.getActiveClassCss()}>
        <slot />
      </div>
    );

  }

}
