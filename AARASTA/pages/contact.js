import React, { useState, useRef, useEffect } from "react";
import { Gradient } from "@/components/Gradient";
import { useStateContext } from "@/context/StateContext";
import { toast } from "react-hot-toast";

const Contact = () => {
  const ref = useRef();

  useEffect(() => {
    const gradient = new Gradient();
    if (ref.current) {
      gradient.initGradient("#gradient-canvas");
    }
  }, []);

  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [processing, setProcessing] = useState(false);

  const formSubmit = async (e) => {
    setProcessing(true);
    e.preventDefault();
    if (isFormValid) {
      try {
        await sendEmail();
        setProcessing(false);
        toast.success("Email sent successfully!");
      } catch (error) {
        setProcessing(false);
        toast.error("Error sending email!");
        console.error("Error sending email:", error);
      }
    }
  };

  const {
    cust_name,
    setCust_Name,
    cust_email,
    setCust_Email,
    cust_mssg,
    setCust_mssg,
  } = useStateContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setCust_Name(value);
        break;
      case "email":
        setCust_Email(value);
        break;
      case "message":
        setCust_mssg(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Form validation logic
    const errors = {};
    if (!cust_name.trim()) {
      errors.name = "Name is required";
    }
    if (!cust_email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(cust_email)) {
      errors.email = "Invalid email format";
    }
    if (!cust_mssg.trim()) {
      errors.message = "Message is required";
    }

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [cust_name, cust_email, cust_mssg]);

  const isValidEmail = (email) => {
    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const sendEmail = async () => {
    try {
      const response = await fetch("/api/contactMail", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cust_name,
          email: cust_email,
          message: cust_mssg,
        }),
      });
  
      if (response.ok) {
        // Clear the form fields after successful email send
        setCust_Name("");
        setCust_Email("");
        setCust_mssg("");
      } else {
        toast.error("Error sending email!");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Error sending email!");
    }
  };
  
  return (
    <div className="h-screen mx-14 my-14 max-[730px]:m-0 relative" ref={ref}>
      <canvas
        id="gradient-canvas"
        data-transition-in
        className="w-full h-full  rounded-2xl max-[730px]:rounded-none"
        style={{
          backgroundImage: `url("/hero-background.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full px-[3rem] max-[750px]:px-[1rem] items-center justify-center rounded-2xl max-[730px]:rounded-none bg-black bg-opacity-30 flex flex-col gap-[2rem] py-8">
        <form
          className="bg-black text-white p-8 w-[500px] max-[533px]:w-auto rounded-lg shadow-md backdrop-blur-md backdrop-filter backdrop-opacity-60"
          onSubmit={formSubmit}
        >
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          {/* Name input field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-white text-sm font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              required
              value={cust_name}
              name="name"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border text-black border-gray-400 focus:outline-none focus:border-white"
            />
            {formErrors.name && (
              <span className="text-red-500 text-sm">{formErrors.name}</span>
            )}
          </div>
          {/* Email input field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              required
              value={cust_email}
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border text-black border-gray-400 focus:outline-none focus:border-white"
            />
            {formErrors.email && (
              <span className="text-red-500 text-sm">{formErrors.email}</span>
            )}
          </div>
          {/* Message textarea field */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-white text-sm font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              required
              value={cust_mssg}
              name="message"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border text-black border-gray-400 focus:outline-none focus:border-white"
            />
            {formErrors.message && (
              <span className="text-red-500 text-sm">{formErrors.message}</span>
            )}
          </div>
          <button
            type="submit"
            disabled={processing || !isFormValid}
            className={`w-full bg-black border hover:border-white text-white px-4 py-2 rounded-md transition-colors`}
          >
            {processing ? (
              <div className="flex items-center justify-center group">
                <div className="rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-100  animate-spin"></div>
                <div className="ml-2">Processing...</div>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
        <div className="max-w-[800px] max-[730px]:px-[2rem ] max-[533px]:px-0  text-white text-base">
          *If you prefer not to contact us through the form, feel free to reach
          out via WhatsApp or, regular messages at (0300 0000000), or email us @
          (aarasta.customer@gmail.com). We are always delighted to assist you,
          and you can expect a response within 24 hours or even earlier.
        </div>
      </div>
    </div>
  );
};

export default Contact;
