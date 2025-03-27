export const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
export const emailRegexp =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
export const phoneNumberExp = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
export const otpRegexp = /^[0-9]/

export const regExp = {
  PASSWORD: passwordRegex,
  EMAIL: emailRegexp,
  PHONE_NUMBER: phoneNumberExp,
  OTP: otpRegexp,
}

export const translations = {
  emptyData: 'Empty data',
  checkbox: {
    all: 'Select All',
    allVisible: 'Select visible rows',
    none: 'None',
  },
  customizationAction: {
    modalName: 'Customize columns',
    info: 'Visible columns are ',
    actionButtonName: 'Save as default',
    validationMessage: 'The maximum number of freezing columns can be 3',
    columns: 'hexukColumns',
    pinnedColumns: 'pinnedColumns',
  },
  deleteAction: 'Delete',
  editAction: 'Edit',
  deleteAllAction: 'Delete All',
  filterAction: {
    modalName: 'Filter by',
    advanced: 'Advanced filters',
    confirmFilters: 'Submit',
    clearFilters: 'Clear all filters',
    clearDate: 'Clear',
    todayButton: 'Today',
    hour: 'Hour',
    min: 'Min',
    sec: 'Sec',
    loadMore: 'Load more',
    emptyFieldData: 'Empty Data',
    blank: 'դատարկ',
    emptyString: 'Empty',
    from: 'From',
    to: 'To',
    validations: {
      isEmpty: 'Empty field',
      onlyNumbers: 'Only numbers',
      err: 'err',
      invalid: 'invalid',
    },
    emptyColumns: 'Add Filters Columns',
  },
  dowloadAction: 'Download report',
  pagination: {
    from: 'from',
    show: 'Show',
    rows: 'Rows',
    to: 'Go to',
  },
}
