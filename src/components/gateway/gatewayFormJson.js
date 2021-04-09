export const gatewayFormJson = {
  formControls: [
    {
      name: 'serialNumber',
      tabIndex: 1,
      label: 'Serial Number',
      placeHolder: 'Serial Number',
      type: 'text',
      value: '',
      required: true,
      errorMessage: 'Serial Number Required',
    },
    {
      name: 'name',
      tabIndex: 2,
      label: 'Name',
      placeHolder: 'Name',
      type: 'text',
      value: '',
      required: true,
      errorMessage: 'Name Required',
      validations: [
        {
          type: 'Regex',
          value: new RegExp('^[a-zA-Z ]{3,}$'),
          message: 'Name should have only character and spaces',
          show: false,
        },
      ],
    },
    {
      name: 'ipV4',
      tabIndex: 1,
      label: 'IPV4',
      placeHolder: 'ipv4',
      type: 'text',
      value: '',
      required: true,
      errorMessage: 'IPV4 Required',
      validations: [
        {
          type: 'Regex',
          value: new RegExp('^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$'),
          message: 'please enter valid IPV4',
          show: false,
        },
      ],
    },
  ],
  isValidForm: false,
  formReset: false,
};
