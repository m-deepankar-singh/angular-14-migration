import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import {
  TreeviewConfig,
  TreeviewItem,
  DropdownTreeviewComponent,
  TreeviewI18n,
  TreeviewHelper,
  DropdownDirective,
} from 'ngx-treeview';
import { DropdownTreeviewSelectI18n } from './dropdown-treeview-select-i18n';
import { isNil } from 'lodash';

@Component({
  selector: 'app-dropdown-treeview-select',
  templateUrl: './dropdown-treeview-select.component.html',
  styleUrls: ['./dropdown-treeview-select.component.scss'],
  providers: [{ provide: TreeviewI18n, useClass: DropdownTreeviewSelectI18n }],
})
export class DropdownTreeviewSelectComponent implements OnChanges {
  @Input() config: TreeviewConfig;
  @Input() items: TreeviewItem[];
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  @ViewChild(DropdownTreeviewComponent)
  dropdownTreeviewComponent: DropdownTreeviewComponent;
  dropdownDirective: DropdownDirective;
  filterText: string;
  private dropdownTreeviewSelectI18n: DropdownTreeviewSelectI18n;

  constructor(public i18n: TreeviewI18n) {
    this.config = TreeviewConfig.create({
      hasAllCheckBox: true,
      hasCollapseExpand: true,
      hasFilter: true,
      maxHeight: 200,
    });
    this.dropdownTreeviewSelectI18n = i18n as any;
  }

  ngOnInit() {
    //this.getAllItemTypes();
    console.log(`tree view ngonit()`, this.items);
    if (this.items && this.items.length > 0) {
      //this.select(this.items[0]);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (isNil(this.value) || this.value == 0) {
      this.selectAll();
    } else {
      this.updateSelectedItem();
    }
  }

  select(item: TreeviewItem) {
    //if (item.children === undefined) {
    this.selectItem(item);
    //}
  }

  private updateSelectedItem() {
    if (!isNil(this.items)) {
      const selectedItem = TreeviewHelper.findItemInList(
        this.items,
        this.value
      );
      if (selectedItem) {
        this.selectItem(selectedItem);
      } else {
        this.selectAll();
      }
    }
  }

  private selectItem(item: TreeviewItem) {
    this.dropdownDirective.close();
    if (this.dropdownTreeviewSelectI18n.selectedItem !== item) {
      this.dropdownTreeviewSelectI18n.selectedItem = item;
      if (this.value !== item.value) {
        this.value = item.value;
        this.valueChange.emit(item.value);
      }
    }
  }

  private selectAll() {
    const allItem = this.dropdownTreeviewComponent.treeviewComponent.allItem;
    this.selectItem(allItem);
  }
}
