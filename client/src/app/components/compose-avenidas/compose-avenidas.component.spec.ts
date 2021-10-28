import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzSelectModule, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ApiService } from 'src/app/services/api/api.service';
import { Overlay } from '@angular/cdk/overlay';

import { environment } from 'src/environments/environment';

import { ComposeAvenidasComponent } from './compose-avenidas.component';

describe('ComposeAvenidasComponent', () => {
  let component: ComposeAvenidasComponent;
  let fixture: ComponentFixture<ComposeAvenidasComponent>;
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeAvenidasComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        NzSelectModule,
        BrowserAnimationsModule,
      ],
      providers: [
        ApiService,
        NzMessageService,
        Overlay,
        {
          provide: NzModalRef,
          useValue: {
            destroy: () => {},
            getInstance: () => {
              return {
                setFooterWithTemplate: () => {},
              };
            },
          },
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeAvenidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be able to create a new avenue', () => {
    const avenueDummy = {
      name: 'IBT',
    };

    component.avenueForm.setValue(avenueDummy);
    component.saveAvenue();

    const okResponse = {
      status: {
        statusCode: 201,
        message: 'Created successfully.',
      },
      result: [
        {
          name: 'IBT',
        },
      ],
    };

    const request = httpTestingController.expectOne({
      method: 'POST',
      url: environment.api_url + '/avenues',
    });

    request.flush(okResponse);

    expect(okResponse.status.statusCode).toBe(201);
    expect(okResponse.result).toBeDefined();
  });
});
