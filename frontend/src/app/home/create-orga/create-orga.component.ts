import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Organization} from "../../db/entity/organization";
import {Router} from "@angular/router";
import {MatStepper} from "@angular/material/stepper";
import {OrganizationService} from "../../services/organization.service";
import {countries} from "../../util/data/country.data";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {BranchService} from "../../services/branch.service";
import {LegalFormService} from "../../services/legalForm.service";
import {MatDialog} from "@angular/material/dialog";
import {OpeningHoursDialogComponent} from "./opening-hours-dialog/opening-hours-dialog.component";
import {FileService} from "../../services/file.service";
import {Marker} from "../../util/data/marker.data";
import {GoogleMap} from "@angular/google-maps";
import {POI} from "../../db/entity/poi";
import {AdvertService} from "../../services/advert.service";
import {AdvertRest} from "../../db/rest/advert.rest";
import {ToastrService} from "ngx-toastr";
import {MapConfiguration} from "../../util/map-configuration.interface";

@Component({
  selector: 'app-create-orga',
  templateUrl: './create-orga.component.html',
  styleUrls: ['./create-orga.component.css']
})
export class CreateOrgaComponent implements OnInit, AfterViewInit {

  @ViewChild('mapSearchField') searchField!: ElementRef;
  @ViewChild(GoogleMap) map!: GoogleMap;

  private readonly _basicInformationForm: FormGroup;
  private readonly _organizationInformationForm: FormGroup;
  private readonly _advertForm: FormGroup;
  private _organization = new Organization();
  private _advert = new AdvertRest();
  private _files: any[] = [];
  private _logoUploaded: boolean = false;
  private _logoUrl: any;
  private _creatingPartner: boolean = false;
  private _countries: string[] = countries;
  private _branches: string[] = [];
  private _legalForms: string[] = [];
  private _filteredCountries!: Observable<string[]>;
  private _filteredBranches!: Observable<string[]>;
  private _advertFilteredCountries!: Observable<string[]>;
  private _basicSelected: boolean = false;
  private _advancedSelected: boolean = false;
  private _premiumSelected: boolean = false;
  private _advertFile!: File;

  // Google Maps Config
  private _markers: Marker[] = [];
  center!: google.maps.LatLngLiteral
  options: MapConfiguration = {
    disableDefaultUI: true,
    zoomControl: true,
    scrollwheel: false,
    mapTypeControl: false,
    streetViewControl: false,
    disableDoubleClickZoom: true,
    maxZoom: 30,
    minZoom: 4,
    mapId: 'e3592cb35de393bd'
  }

  get advertFile() {
    return this._advertFile
  }

  get markers() {
    return this._markers;
  }

  get basicSelected() {
    return this._basicSelected;
  }

  get advancedSelected() {
    return this._advancedSelected;
  }

  get premiumSelected() {
    return this._premiumSelected;
  }

  get advert() {
    return this._advert;
  }

  get filteredCountries() {
    return this._filteredCountries;
  }

  get filteredBranches() {
    return this._filteredBranches;
  }

  get advertFilteredCountries() {
    return this._advertFilteredCountries;
  }

  get legalForms() {
    return this._legalForms;
  }

  get countries() {
    return this._countries;
  }

  get creatingPartner() {
    return this._creatingPartner;
  }

  get logoUrl() {
    return this._logoUrl;
  }

  get organization() {
    return this._organization;
  }

  get files(): any[] {
    return this._files;
  }

  get basicInformationForm() {
    return this._basicInformationForm;
  }

  get organizationInformationForm() {
    return this._organizationInformationForm;
  }

  get advertForm() {
    return this._advertForm;
  }

  constructor(private _router: Router,
              private _organizationService: OrganizationService,
              private _branchService: BranchService,
              private _legalFormService: LegalFormService,
              private _fileService: FileService,
              private _matDialog: MatDialog,
              private _advertService: AdvertService,
              private _toastService: ToastrService) {
    this._basicInformationForm = new FormGroup({
        organizationName: new FormControl({value: this._organization.organizationName, disabled: false}, {
          updateOn: 'change',
          /*validators: [Validators.required]*/
        }),
        mail: new FormControl({value: this._organization.mail, disabled: false}, {
          updateOn: 'change',
          /* validators: [Validators.required]*/
        }),
        telephoneNumber: new FormControl({value: this._organization.telephoneNumber, disabled: false}, {
          updateOn: 'change',
          /*validators: [Validators.required]*/
        }),
        streetName: new FormControl({value: this._organization.location.streetName, disabled: false}, {
          updateOn: 'change',
          /*validators: [Validators.required]*/
        }),
        zipCode: new FormControl({value: this._organization.location.zipCode, disabled: false}, {
          updateOn: 'change',
          /*validators: [Validators.required]*/
        }),
        village: new FormControl({value: this._organization.location.village, disabled: false}, {
          updateOn: 'change',
          /*
                    validators: [Validators.required]
          */
        }),
        countryName: new FormControl({value: this._organization.location.countryName, disabled: false}, {
          updateOn: 'change',
          /*validators: [Validators.required]*/
        }),
      }
    );
    this._organizationInformationForm = new FormGroup({
      ustId: new FormControl({value: this._organization.ustId, disabled: false}, {
        updateOn: 'change',
        /*validators: [Validators.required]*/
      }),
      commercialRegisterNumber: new FormControl({value: this._organization.commercialRegisterNumber, disabled: false}, {
        updateOn: 'change',
        /*
                validators: [Validators.required]
        */
      }),
      tradeLicence: new FormControl({value: this._organization.tradeLicence, disabled: false}, {
        updateOn: 'change',
        /*
                validators: [Validators.required]
        */
      }),
      branch: new FormControl({value: this._organization.branchName, disabled: false}, {
        updateOn: 'change',
        /*
                validators: [Validators.required]
        */
      }),
      legalForm: new FormControl({value: this._organization.legalFormName, disabled: false}, {
        updateOn: 'change',
        /*
                validators: [Validators.required]
        */
      })
    });
    this._advertForm = new FormGroup({
      startTime: new FormControl({value: this._advert.startTime, disabled: true}, {
        updateOn: 'change'
      }),
      shortDescription: new FormControl({value: this._advert.shortDescription, disabled: false}, {
        updateOn: 'change'
      }),
      longDescription: new FormControl({value: this._advert.shortDescription, disabled: false}, {
        updateOn: 'change'
      }),
      streetName: new FormControl({value: this._advert.location.streetName, disabled: false}, {
        updateOn: 'change',
        /*validators: [Validators.required]*/
      }),
      zipCode: new FormControl({value: this._advert.location.zipCode, disabled: false}, {
        updateOn: 'change',
        /*validators: [Validators.required]*/
      }),
      village: new FormControl({value: this._advert.location.village, disabled: false}, {
        updateOn: 'change',
        /*
                  validators: [Validators.required]
        */
      }),
      countryName: new FormControl({value: this._advert.location.countryName, disabled: false}, {
        updateOn: 'change',
        /*validators: [Validators.required]*/
      }),
      advertType: new FormControl({value: this._advert.advertTypeName, disabled: false}, {
        updateOn: 'change',
      }),

    });
  }

  ngOnInit(): void {
    this._filteredCountries = this._basicInformationForm.controls['countryName'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountry(value))
    );

    this._filteredBranches = this._organizationInformationForm.controls['branch'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterBranch(value))
    );

    this._advertFilteredCountries = this._advertForm.controls['countryName'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountry(value))
    );

    this._branchService.getBranches().subscribe(response => {
      this._branches = response;
    }, error => {
      console.log('While trying to fetch current Branch-Set from server an error occurred', error)
    });

    this._legalFormService.getLegalForms().subscribe(response => {
      this._legalForms = response;
    }, error => {
      console.log('While trying to fetch current Branch-Set from server an error occurred', error)
    });

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  ngAfterViewInit(): void {
    const searchBox = new google.maps.places.SearchBox(this.searchField.nativeElement);
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.searchField.nativeElement);

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      places.forEach(place => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
        this.onSelectPOI(place.geometry.location.toJSON());
      });
      this.map.fitBounds(bounds);
    });
  }

  onBack() {
    this._router.navigateByUrl('/home').then();
  }

  onFileBrowserHandler(event: any) {
    this._organization.logo = event.target.files[0];
    this._logoUploaded = true;
  }

  onDroppedFileHandler(files: any[]) {
    this._organization.logo = files[0];
    this._logoUploaded = true;
  }

  onDeleteFile(fileSelectRef: HTMLInputElement, fileDropRef: HTMLInputElement) {
    // @ts-ignore
    this._organization.logo = undefined
    fileSelectRef.value = '';
    fileDropRef.value = '';
  }

  onFinishPartnerInformation() {
    this._organization.organizationName = this._basicInformationForm.controls['organizationName'].value;
    this._organization.mail = this._basicInformationForm.controls['mail'].value;
    this._organization.telephoneNumber = this._basicInformationForm.controls['telephoneNumber'].value;
    this._organization.location.streetName = this._basicInformationForm.controls['streetName'].value;
    this._organization.location.zipCode = this._basicInformationForm.controls['zipCode'].value;
    this._organization.location.village = this._basicInformationForm.controls['village'].value;
    this._organization.location.countryName = this._basicInformationForm.controls['countryName'].value;
    this._organization.ustId = this._organizationInformationForm.controls['ustId'].value;
    this._organization.commercialRegisterNumber = this._organizationInformationForm.controls['commercialRegisterNumber'].value;
    this._organization.branchName = this._organizationInformationForm.controls['branch'].value;
    this._organization.legalFormName = this._organizationInformationForm.controls['legalForm'].value;
    console.log(this._organization);
    const reader = new FileReader();
    reader.readAsDataURL(this._organization.logo);
    reader.onload = () => {
      this._logoUrl = reader.result;
    }
  }

  onUploadTradeLicence(event: any) {
    this._organization.tradeLicence = event.target.files[0];
    console.log(this._organization.tradeLicence);
  }

  onRemoveTradeLicence() {
    // @ts-ignore
    this._organization.tradeLicence = undefined;
  }


  onCreateOrganization(stepper: MatStepper) {
    this._creatingPartner = true;
    let fileNameTradeLicence: string;
    let logoFileName: string;
    this._fileService.uploadFiles(this._organization.tradeLicence).subscribe(response => {
      fileNameTradeLicence = response.fileName;
      this._fileService.uploadFiles(this._organization.logo).subscribe(response => {
        logoFileName = response.fileName;
        this._organizationService.createOrganization(OrganizationService.createOrganizationRestObject(this._organization, fileNameTradeLicence, logoFileName)).subscribe(response => {
            if (response !== null) {
              this._creatingPartner = false;
              stepper.next();
            }
          },
          error => {
            this._creatingPartner = false;
            console.error(error);
            alert("Fehler beim Erstellen des Partners");
          });
      });
    });

  }

  private _filterCountry(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this._countries.filter(country => country.toLowerCase().includes(filterValue));
  }

  private _filterBranch(value: string) {
    const filterValue = value.toLowerCase();

    return this._branches.filter(branch => branch.toLowerCase().includes(filterValue));
  }


  onOpenOpeningHoursDialog() {
    let openingHoursDialogRef = this._matDialog.open(OpeningHoursDialogComponent, {
      width: '600px',
      height: '550px'
    });
    openingHoursDialogRef.afterClosed().subscribe(result => {
      this._organization.openingHours = result;
      console.log(this._organization.openingHours);
    })
  }

  onUploadAdvertFile($event: any) {
    this._advertFile = $event.target.files[0];
  }

  onRemoveAdvertFile() {
    // @ts-ignore
    this._advert.advertFile = undefined;
  }

  onUpdateAdvertType(typeName: string) {
    switch (typeName) {
      case "basic": {
        this.settingAdvertTypeBooleans(!this._basicSelected, false, false);
        break;
      }
      case "advanced": {
        this.settingAdvertTypeBooleans(false, !this._advancedSelected, false);
        break;
      }
      case "premium": {
        this.settingAdvertTypeBooleans(false, false, !this._premiumSelected);
        break;
      }
    }
  }

  private settingAdvertTypeBooleans(basic: boolean, advanced: boolean, premium: boolean) {
    this._basicSelected = basic;
    this._advancedSelected = advanced;
    this._premiumSelected = premium;
  }

  onSelectPOI(position: any) {
    if (this._markers.length < this.getDataFromAdvertTypeSelection(true)) {
      const marker = new Marker();
      marker.position = position;
      this._markers.push(marker);
    } else {
      this._toastService.error('Maximale Anzahl der gesetzten POIs erreicht.', 'POIs können nicht gesetzt werden');
    }
  }

  // TODO implement better way for getting marker amount
  private getDataFromAdvertTypeSelection(amount: boolean) {
    if (this._basicSelected) {
      return amount ? 5 : 'basic';
    } else if (this._advancedSelected) {
      return amount ? 10 : 'advanced';
    } else if (this._premiumSelected) {
      return amount ? 20 : 'premium';
    }
    return amount ? 0 : '';
  }

  onDeleteMarker(index: number) {
    this._markers.splice(index, 1);
  }

  onCreateAdvert() {
    this._advert.startTime = this._advertForm.controls['startTime'].value.getTime();
    this._advert.shortDescription = this._advertForm.controls['shortDescription'].value;
    this._advert.longDescription = this._advertForm.controls['longDescription'].value;
    this._advert.location.streetName = this._advertForm.controls['streetName'].value;
    this._advert.location.zipCode = this._advertForm.controls['zipCode'].value;
    this._advert.location.village = this._advertForm.controls['village'].value;
    this._advert.location.countryName = this._advertForm.controls['countryName'].value;
    this._advert.advertTypeName = this.getDataFromAdvertTypeSelection(false) as string;
    this._advert.pois = this.createPOIsOfMarkerList();
    this._advert.organizationName = this._organization.organizationName;
    this._fileService.uploadFiles(this._advertFile).subscribe(response => {
      this._advert.advertFileName = response.fileName;
      this._advertService.createAdvert(this._advert).subscribe(response => {
        console.log(response);
      }, error => {
        console.error(error);
      });
    }, error => console.error(error));

  }

  private createPOIsOfMarkerList() {
    const poiArray: POI[] = [];
    this._markers.forEach(t => {
      let poi = new POI();
      poi.longitude = t.position.lat;
      poi.latitude = t.position.lng;
      poi.name = this._organization.organizationName + '_' + poi.longitude + '_' + poi.latitude;
      poiArray.push(poi);
    });
    return poiArray;
  }
}
