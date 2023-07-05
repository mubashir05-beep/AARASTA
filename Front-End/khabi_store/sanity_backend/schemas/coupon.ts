
const coupon = {
    name: 'coupon',
    title: 'Coupon',
    type: 'document',
    fields: [
      {
        name: 'couponName',
        title: 'Coupon_Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'couponCode',
        title: 'Coupon_Code',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'couponDiscountPercentage',
        title: 'Coupon_Discount_Percentage',
        type: 'number',
      },
      {
        name: 'couponDiscountPKR',
        title: 'Coupon_Discount_PKR',
        type: 'number',
      },
      
    ],
  };
  export default coupon