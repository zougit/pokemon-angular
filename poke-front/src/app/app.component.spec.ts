import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
        AuthService,
      ],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });
  
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isLogged and user on ngOnInit', () => {
    const mockUser = {
      /* Replace with your mock user data */
    };

    // Mock the behavior of authService.isAuthenticated
    jest.spyOn(authService, 'isAuthenticated').mockReturnValue(true);

    // Mock the behavior of localStorage.getItem
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(JSON.stringify(mockUser));

    component.ngOnInit();

    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(component.isLogged).toBe(true);
    expect(component.user).toEqual(mockUser);
  });

  it('should update isLogged on ngOnChanges', () => {
    // Mock the behavior of authService.isAuthenticated
    jest.spyOn(authService, 'isAuthenticated').mockReturnValue(false);

    component.ngOnchanges();

    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(component.isLogged).toBe(false);
  });

  it('should disconnect and navigate to login on disconnect', () => {
    // Mock the behavior of localStorage.setItem
    jest.spyOn(Storage.prototype, 'setItem');

    // Mock the behavior of router.navigate
    jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve(true));

    component.disconnect();

    expect(Storage.prototype.setItem).toHaveBeenCalledWith('token', '');
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('user', '');
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
