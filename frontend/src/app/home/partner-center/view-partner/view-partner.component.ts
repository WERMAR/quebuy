import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input, OnChanges,
  OnInit, SimpleChanges
} from '@angular/core';
import {OrganizationRest} from 'src/app/db/rest/organization.rest';
import {FormControl, FormGroup} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {Advert} from "../../../db/entity/advert";
import {countries} from "../../../util/data/country.data";
import {BranchService} from "../../../services/branch.service";
import {LegalFormService} from "../../../services/legalForm.service";
import {OpeningHoursDialogComponent} from "../../create-orga/opening-hours-dialog/opening-hours-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FileService} from "../../../services/file.service";
import {UploadConfirmDialogComponent} from "../../../dialogs/upload-confirm-dialog/upload-confirm-dialog.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-view-partner',
  templateUrl: './view-partner.component.html',
  styleUrls: ['./view-partner.component.css']
})
export class ViewPartnerComponent implements OnInit, OnChanges {

  @Input() selectedPartner: OrganizationRest = new OrganizationRest();

  private _countries: string[] = countries;
  private readonly _partnerForm: FormGroup;
  private _advertForm: FormGroup;
  private _filteredCountries!: Observable<string[]>;
  private _advert: Advert = new Advert();
  private _editMode: boolean = false;
  private _filteredBranches!: Observable<string[]>;
  private _branches: string[] = [];
  private _legalForms: string[] = [];
  private _tradeLicenceFile!: File | undefined;
  private _logoFile!: File | undefined;
  private _removeFileTL: boolean = false;
  private _removeFileLOGO: boolean = false;
  private _logoFileName!: string;
  private _tradeLicenceFileName!: string;
  private _tradeLicenceFileUploaded: boolean = false;
  private _logoFileUploaded: boolean = false;

  get removeFileLOGO() {
    return this._removeFileLOGO;
  }

  get logoFile() {
    return this._logoFile;
  }

  get removeFileTL() {
    return this._removeFileTL;
  }

  get legalForms() {
    return this._legalForms;
  }

  get editMode() {
    return this._editMode;
  }

  get filteredCountries() {
    return this._filteredCountries;
  }

  get filteredBranches() {
    return this._filteredBranches;
  }

  get partnerForm() {
    return this._partnerForm;
  }

  get tradeLicenceFile() {
    return this._tradeLicenceFile;
  }

  constructor(private _branchService: BranchService,
              private _legalFormService: LegalFormService,
              private _matDialog: MatDialog,
              private _fileService: FileService,
              private _toastService: ToastrService) {
    this._partnerForm = new FormGroup({
        organizationName: new FormControl({value: this.selectedPartner.organizationName, disabled: false}, {
          updateOn: 'change',
          /*validators: [Validators.required]*/
        }),
        mail: new FormControl({value: this.selectedPartner.mail, disabled: false}, {
          updateOn: 'change',
          /* validators: [Validators.required]*/
        }),
        telephoneNumber: new FormControl({value: this.selectedPartner.telephoneNumber, disabled: false}, {
          updateOn: 'change',
          /*validators: [Validators.required]*/
        }),
        streetName: new FormControl({value: this.selectedPartner.location.streetName, disabled: false}, {
          updateOn: 'change',
          /*validators: [Validators.required]*/
        }),
        zipCode: new FormControl({value: this.selectedPartner.location.zipCode, disabled: false}, {
          updateOn: 'change',
          /*validators: [Validators.required]*/
        }),
        village: new FormControl({value: this.selectedPartner.location.village, disabled: false}, {
          updateOn: 'change',
          /*
                    validators: [Validators.required]
          */
        }),
        countryName: new FormControl({value: this.selectedPartner.location.countryName, disabled: false}, {
          updateOn: 'change',
          /*validators: [Validators.required]*/
        }),
        ustId: new FormControl({value: this.selectedPartner.ustId, disabled: false}, {
          updateOn: 'change',
          /*validators: [Validators.required]*/
        }),
        commercialRegisterNumber: new FormControl({
          value: this.selectedPartner.commercialRegisterNumber,
          disabled: false
        }, {
          updateOn: 'change',
          /* validators: [Validators.required] */
        }),
        tradeLicence: new FormControl({value: this.selectedPartner.tradeLicenceFileName, disabled: false}, {
          updateOn: 'change',
          /* validators: [Validators.required] */
        }),
        branch: new FormControl({value: this.selectedPartner.branchName, disabled: false}, {
          updateOn: 'change',
          /* validators: [Validators.required] */
        }),
        legalForm: new FormControl({value: this.selectedPartner.legalFormName, disabled: false}, {
          updateOn: 'change',
          /* validators: [Validators.required] */
        })
      }
    );
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
    this._filteredCountries = this._partnerForm.controls['countryName'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountry(value))
    );
    this._filteredBranches = this._partnerForm.controls['branch'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterBranch(value))
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
  }

  ngOnChanges(changes: SimpleChanges) {
    this._editMode = false;
    this._partnerForm.patchValue({
      organizationName: this.selectedPartner.organizationName,
      mail: this.selectedPartner.mail,
      telephoneNumber: this.selectedPartner.telephoneNumber,
      organizationType: this.selectedPartner.organizationType,
      streetName: this.selectedPartner.location.streetName,
      zipCode: this.selectedPartner.location.zipCode,
      village: this.selectedPartner.location.village,
      countryName: this.selectedPartner.location.countryName,
      ustId: this.selectedPartner.ustId,
      commercialRegisterNumber: this.selectedPartner.commercialRegisterNumber,
      tradeLicence: this.selectedPartner.tradeLicenceFileName,
      branch: this.selectedPartner.branchName,
      legalForm: this.selectedPartner.legalFormName
    });
  }


  onHandleEditBtnClicked() {
    this._editMode = !this._editMode;
  }

  private _filterCountry(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this._countries.filter(country => country.toLowerCase().includes(filterValue));
  }

  private _filterBranch(value: string) {
    const filterValue = value.toLowerCase();

    return this._branches.filter(branch => branch.toLowerCase().includes(filterValue));
  }

  onUploadTradeLicence(event: any) {
    this._tradeLicenceFile = event.target.files[0];
    this._matDialog.open(UploadConfirmDialogComponent, {
      width: '350px',
      height: '200px'
    }).afterClosed().subscribe(result => {
      if (result) {
        this._fileService.uploadFiles(this._tradeLicenceFile as File).subscribe(response => {
          this._tradeLicenceFileName = response.fileName;
          this._tradeLicenceFileUploaded = true;
          this._toastService.success("Gewerbeschein '" + this._tradeLicenceFileName + "' erfolgreich hochgeladen", 'Gewerbeschein hochgeladen');
        })
      } else {
        this._tradeLicenceFileUploaded = false;
      }
    });
  }

  onUpdatePartner() {
    const organizationRest = new OrganizationRest();
    organizationRest.id = this.selectedPartner.id;
    organizationRest.organizationName = this._partnerForm.controls['organizationName'].value;
    organizationRest.telephoneNumber = this._partnerForm.controls['telephoneNumber'].value;
    organizationRest.mail = this._partnerForm.controls['mail'].value;
    organizationRest.ustId = this._partnerForm.controls['ustId'].value;
    organizationRest.commercialRegisterNumber = this._partnerForm.controls['commericalRegisterNumber'].value;
    organizationRest.tradeLicenceFileName = this._partnerForm.controls['tradeLicenceFileName'].value;
    organizationRest.legalFormName = this._partnerForm.controls['legalFormName'].value;
    organizationRest.branchName = this._partnerForm.controls['branchName'].value;
    organizationRest.organizationType = this._partnerForm.controls['organizationType'].value;
    organizationRest.customQuestion = this._partnerForm.controls['customQuestion'].value;
    organizationRest.location.countryName = this._partnerForm.controls['countryName'].value;
    organizationRest.location.village = this._partnerForm.controls['village'].value;
    organizationRest.location.streetName = this._partnerForm.controls['streetName'].value;
    organizationRest.location.zipCode = this._partnerForm.controls['zipCode'].value;

    if (this._tradeLicenceFileUploaded) {
      organizationRest.tradeLicenceFileName = this._tradeLicenceFileName;
    }

    if (this._tradeLicenceFileUploaded) {
      organizationRest.logoFileName = this._logoFileName;
    }
  }

  onTLEnterBtn() {
    if (this._tradeLicenceFile !== undefined)
      this._removeFileTL = true;
  }

  onTLLeaveBtn() {
    this._removeFileTL = false;
  }

  onLOGOEnterBtn() {
    if (this._logoFile !== undefined)
      this._removeFileLOGO = true;
  }

  onLOGOLeaveBtn() {
    this._removeFileLOGO = false;
  }


  onClickHandle(type: string) {
    if (type === 'trade' && this._removeFileTL) {
      this._tradeLicenceFile = undefined;
      if (this._tradeLicenceFileUploaded) {
        this.removeFile(this._tradeLicenceFileName, type);
      }
    } else if (type === 'logo' && this._removeFileLOGO) {
      this._logoFile = undefined;
      if (this._logoFileUploaded) {
        this.removeFile(this._logoFileName, type);
      }
    }
  }

  onUploadLogo($event: any) {
    this._logoFile = $event.target.files[0];
    this._matDialog.open(UploadConfirmDialogComponent, {
      width: '350px',
      height: '200px'
    }).afterClosed().subscribe(result => {
      if (result) {
        this._fileService.uploadFiles(this._logoFile as File).subscribe(response => {
          this._logoFileName = response.fileName;
          this._logoFileUploaded = true;
          this._toastService.success("Logo '" + this._logoFileName + "' erfolgreich hochgeladen", 'Logo hochgeladen');
        })
      } else {
        this._logoFileUploaded = false;
      }
    });
  }

  onOpenOpeningHoursDialog() {
    this._matDialog.open(OpeningHoursDialogComponent, {
      width: '600px',
      height: '550px',
      data: {openingHours: this.selectedPartner.openingHours}
    }).afterClosed().subscribe(result => {
      if (result !== undefined)
        this.selectedPartner.openingHours = result;
    });
  }

  private removeFile(_fileName: string, type: string) {
    let message = '';
    let title = '';
    this._fileService.deleteFile(_fileName).subscribe(response => {
      console.log(response.message);
      if (type === 'logo') {
        this._logoFileName = '';
        this._logoFileUploaded = false;
        message = "Logo gelöscht '" + _fileName + "' erfolgreich gelöscht";
        title = 'Logo gelöscht'
      } else if (type === 'trade') {
        this._tradeLicenceFileName = '';
        this._tradeLicenceFileUploaded = false;
        message = "Gewerbeschein gelöscht '" + _fileName + "' erfolgreich gelöscht";
        title = 'Gewerbeschein gelöscht'
      }
      this._toastService.warning(message, title);
    }, error => {
      console.error(error);
    });
  }
}
