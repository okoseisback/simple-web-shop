export const STATUS_CODES = {
    SUCCESS: 200, // HTTP status code for successful operation.
    CREATED: 201, // HTTP status code for successful resource creation.
    NOT_FOUND: 404, // HTTP status code for resource not found.
    SERVER_ERROR: 500, // HTTP status code for server error.
  };
  
  export const RESP_ERROR_MESSAGES = {
    SERVER_ERROR: 'Internal Server Error', // Error message for internal server error.
    PRODUCT_NOT_FOUND: 'Product not found!', // Error message for product not found.
    ORDER_NOT_FOUND: 'Order not found!', // Error message for order not found.
    ORDER_CREATE_ERROR: 'Failed to create order',
    SHIPPING_OPTION_NOT_FOUND: 'Shipping Option not found!' // Error message for shipping option not found.
  };
  
  export const EMAIL_SUBJECTS = {
    NEW_ORDER_NOTIF: 'New Order Notification!'
  };
  
  export const WELCOME_SIGNATURE = (PORT: string | number) => {
    // Starting the server and listening on the specified port.
    console.log(`
  
    ███████╗██╗███╗   ███╗██████╗ ██╗     ███████╗    ██╗    ██╗███████╗██████╗       ███████╗██╗  ██╗ ██████╗ ██████╗ 
    ██╔════╝██║████╗ ████║██╔══██╗██║     ██╔════╝    ██║    ██║██╔════╝██╔══██╗      ██╔════╝██║  ██║██╔═══██╗██╔══██╗
    ███████╗██║██╔████╔██║██████╔╝██║     █████╗█████╗██║ █╗ ██║█████╗  ██████╔╝█████╗███████╗███████║██║   ██║██████╔╝
    ╚════██║██║██║╚██╔╝██║██╔═══╝ ██║     ██╔══╝╚════╝██║███╗██║██╔══╝  ██╔══██╗╚════╝╚════██║██╔══██║██║   ██║██╔═══╝ 
    ███████║██║██║ ╚═╝ ██║██║     ███████╗███████╗    ╚███╔███╔╝███████╗██████╔╝      ███████║██║  ██║╚██████╔╝██║     
    ╚══════╝╚═╝╚═╝     ╚═╝╚═╝     ╚══════╝╚══════╝     ╚══╝╚══╝ ╚══════╝╚═════╝       ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     
                                                                                                                       
    
     Powered by OKTAY KÖSE(okoseisback@gmail.com)                                                               v1.0.0
    `);
    console.log('----------------------------------------------------------------------------------------------------------------------')
    console.log(`🍷 Server is running on http://localhost:${PORT}`); // Logging a message indicating that the server is running.
  };
  