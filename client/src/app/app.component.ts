import { Component } from '@angular/core';
import ScrollReveal from 'scrollreveal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  public constructor(){    
    ScrollReveal().reveal('.reveal-300', { delay: 300, easing: 'ease-in' });
    ScrollReveal().reveal('.reveal-250', { delay: 100, easing: 'ease-in'  });
    ScrollReveal().reveal('.reveal-200', { delay: 100, easing: 'ease-in'  });
    ScrollReveal().reveal('.reveal-150', { delay: 100, easing: 'ease-in'  });
    ScrollReveal().reveal('.reveal-100', { delay: 100, easing: 'ease-in'  });
    ScrollReveal().reveal('.reveal-50', { delay: 100, easing: 'ease-in'  });
  }


}
