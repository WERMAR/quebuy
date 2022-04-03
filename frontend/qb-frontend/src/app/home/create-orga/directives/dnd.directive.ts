import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {

  @Output() fileDropped = new EventEmitter<any>();
  @HostBinding('class.drag-drop-animation') private _fileOver: boolean = false;

  get fileOver(): boolean {
    return this._fileOver;
  }

  set fileOver(value: boolean) {
    this._fileOver = value;
  }


  constructor() {
  }

  @HostListener('dragover', ['$event'])
  onDragover(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
    console.log('Drag over');
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    console.log('Drag over');
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this._fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length === 1 && files[0].type.match('image/*')) {
      this.fileDropped.emit(files);
    }
  }
}
