import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit,AfterViewInit {

  rotation = false;

  @Output()
  isRotated = new EventEmitter<boolean>();

  constructor(private rend: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Get all DOM elements with class == '.navlink'
    const elem = this.el.nativeElement.querySelectorAll('.nav__link');

    // color Active Link on the sidebar
    this.colorLink(elem);

  }

  toggle() {
    this.rotation = !this.rotation;
    this.isRotated.emit(this.rotation);
  }

  // color Active Link on the sidebar
  colorLink(navLinkElements) {
    // For each element, we add a click Event Listener
    navLinkElements.forEach(navLinkElement => {

      this.rend.listen(navLinkElement,"click", () => {

        // When an element is clicked, we remove the class 'active' from :navLinkElemets if exists
        navLinkElements.forEach(e2 => {
          this.rend.removeClass(e2,"active");
        });

        // we add the class 'active' to the clicked element
        this.rend.addClass(navLinkElement,"active");
      })
    });
    
  }

}
