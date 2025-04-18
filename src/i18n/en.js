import { en } from 'vuetify/locale'

export default {
  $vuetify: en,
  nav: {
    register: 'Register',
    login: 'login',
    cart: 'Shopping cart',
    orders: 'order',
    admin: 'Management',
    logout: 'Logout',
    adminProducts: 'Product Management',
    adminOrders: 'Order Management',
    home: 'Home',
    product: 'goods',
    },
    register: {
    submit: 'Create account',
    success: 'Registration successful'
    },
    login: {
    submit: 'Login',
    success: 'Login successful'
    },
    logout: {
    success: 'Logout successful',
    },
    user: {
    account: 'account',
    email: 'Mailbox',
    password: 'password',
    passwordConfirm: 'Confirm password'
    },
    cart: {
    checkout: 'checkout',
    },
    order: {
    createdAt: 'order time',
    cart: 'goods',
    price: 'order amount',
    account: 'account'
    },
    admin: {
    index: 'Select management project'
    },
    adminProduct: {
    new: 'New product',
    edit: 'Edit product',
    cancel: 'cancel',
    submit: 'confirm',
    newSuccess: 'Add successfully',
    editSuccess: 'Edit successfully',
    },
    product: {
    image: 'picture',
    name: 'name',
    description: 'Description',
    price: 'price',
    category: 'category',
    sell: 'upload and remove shelves',
    createdAt: 'Add time',
    updatedAt: 'update time',
    onSell: 'On the shelves',
    notOnSell: 'Remove',
    addCart: 'Add to cart',
    addCartQuantityInvalid: 'Quantity format does not match',
    addCartSuccess: 'Add to shopping cart successfully',
    },
    productCategory: {
    food: 'food',
    drink: 'drink',
    music: 'music',
    phone: 'mobile phone'
    },
    fileAgent: {
    helpText: 'Click or drag the file here',
    errorType: 'File type error',
    errorSize: 'File size exceeds limit',
    },
    api: {
    userAccountRequired: 'User account required',
    userAccountTooShort: 'User account too short',
    userAccountTooLong: 'User account too long',
    userAccountInvalid: 'User account format does not match',
    userAccountDuplicate: 'Duplicate user account',
    userPasswordRequired: 'User password required',
    userPasswordTooShort: 'User password is too short',
    userPasswordTooLong: 'User password is too long',
    userPasswordIncorrect: 'Password incorrect',
    userPasswordNotMatch: 'Password does not match',
    userEmailRequired: 'User email required',
    userEmailInvalid: "The user's mailbox format does not match",
    userCartProductRequired: 'Shopping cart product required',
    userCartQuantityRequired: 'Shopping cart quantity required',
    userCartQuantityTooSmall: 'Shopping cart quantity does not match',
    userNotFound: 'No user found',
    userPermissionDenied: 'Insufficient user permission',
    userTokenInvalid: 'User verification error',
    userTokenExpired: 'Login expired',
    productIdInvalid: 'Wrong product ID',
    productNameRequired: 'Product name required',
    productPriceRequired: 'Product price required',
    productPriceTooSmall: 'Product price does not match',
    productImageRequired: 'Product image required',
    productDescriptionRequired: 'Product description required',
    productCategoryRequired: 'Product category required',
    productCategoryInvalid: 'Product category does not match',
    productSellRequired: 'Required for product loading and unloading',
    requestFormatError: 'Request format error',
    productNotOnSell: 'The product is not on the shelves',
    productNotFound: 'No product found',
    orderCartProductRequired: 'Order product required',
    orderCartQuantityRequired: 'Order quantity required',
    orderCartQuantityTooSmall: 'Order quantity does not match',
    orderUserRequired: 'Order user required',
    orderCartRequired: 'Order shopping cart required',
    orderCartEmpty: 'Order shopping cart is empty',
    serverError: 'Server error',
    unknownError: 'Unknown error',
    uploadFailed: 'Upload failed',
  },
}

