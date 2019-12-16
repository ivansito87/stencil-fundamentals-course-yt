import { Component, h, Listen, Element, Prop } from '@stencil/core';
import { AwTabsInterface } from './tabs-component.interface';
// import { format } from '../../utils/utils';

@Component({
  tag: 'active-tabs-component',
  styleUrl: 'active-tabs-component.scss',
  // shadow: true
})
export class MyComponent {

  @Prop({ mutable: true})
  @Element() element: HTMLElement;
  @Listen('tabActivate')
  handleTabActivate(e: CustomEvent<AwTabsInterface>) {

    const headings = this.getHeadings();
    headings.forEach(heading => {
      if (heading.name !== e.detail.name) {
        heading.active = false;
      }
    });

  }

  componentWillRender() {
    this.getHeadings = this.getHeadings.bind(this);
  }

  componentDidLoad() {
    const headings = this.getHeadings();
    const haveActiveTab = headings.filter(heading => heading.active).length > 0;
    if (!haveActiveTab && headings.length > 0) headings[0].active = true;
  }
  private getHeadings() {
    const headings = [].slice.call(this.element.querySelector('.activate-tabs-container').children);
    return headings;
  }

  render() {
    return (
      <div class="activate-tabs-container">
        <slot />
      </div>
    );
  }

}
