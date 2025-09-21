# StratgenAI Demo Booking - Email Integration Setup Guide

## 📧 Complete Email Integration System

This system automatically sends Google Meet links to customers and notifications to `hello@stratgenai.in` when someone books a demo.

## 🚀 Quick Setup (Choose One Method)

### Method 1: EmailJS (Recommended)
1. **Create EmailJS Account**: Go to [emailjs.com](https://emailjs.com)
2. **Create Service**: Connect your Gmail account
3. **Create Templates**:
   - `template_demo_booking` (for company notifications)
   - `template_customer_confirmation` (for customer confirmations)
4. **Update Configuration** in `email-integration.js`:
   ```javascript
   this.emailJSConfig = {
       serviceID: 'your_service_id',
       templateID: 'template_demo_booking',
       userID: 'your_user_id'
   };
   ```

### Method 2: Formspree (Alternative)
1. **Create Formspree Account**: Go to [formspree.io](https://formspree.io)
2. **Create Form**: Get your form ID
3. **Update Configuration** in `email-integration.js`:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```

### Method 3: Web3Forms (Alternative)
1. **Create Web3Forms Account**: Go to [web3forms.com](https://web3forms.com)
2. **Get Access Key**: Copy your access key
3. **Update Configuration** in `email-integration.js`:
   ```javascript
   formData.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY');
   ```

## 📁 Files Created

### 1. `email-integration.js`
- **Main email integration logic**
- **Google Meet link generation**
- **Multiple email service support**
- **Calendar event generation**

### 2. `demo-booking.html`
- **Standalone demo booking form**
- **Beautiful UI with animations**
- **Form validation**
- **Success messages with meeting links**

### 3. `demo-booking-styles.css`
- **Complete styling for the form**
- **Responsive design**
- **Professional animations**

## 🔧 How It Works

### 1. Customer Books Demo
- Fills out the form with their information
- Selects preferred time and date
- Clicks "Schedule Demo"

### 2. System Generates Meeting
- **Creates unique Google Meet link**
- **Calculates meeting time** based on preferences
- **Generates calendar event data**

### 3. Emails Are Sent
- **To Company** (`hello@stratgenai.in`): Booking details + Meet link
- **To Customer**: Confirmation + Meet link + Calendar invite

### 4. Success Message
- **Shows Google Meet link** for immediate access
- **Provides Google Calendar link** to add to calendar
- **Confirms booking details**

## 📧 Email Templates

### Company Notification Email
```
Subject: New Demo Booking - [Customer Name]

New Demo Booking Request:

Name: [Customer Name]
Email: [Customer Email]
Phone: [Customer Phone]
Company: [Company Name]
Company Size: [Company Size]
Preferred Time: [Time Slot]
Preferred Date: [Date]
Message: [Customer Message]

Google Meet Link: [Generated Meet Link]

Booking Time: [Timestamp]
```

### Customer Confirmation Email
```
Subject: Demo Confirmation - StratgenAI

Hi [Customer Name],

Thank you for scheduling a demo with StratgenAI!

Your demo is scheduled for:
Date: [Selected Date]
Time: [Selected Time Slot]
Google Meet Link: [Generated Meet Link]

We look forward to showing you how our AI solutions can help your business.

Best regards,
StratgenAI Team
```

## 🎯 Features

### ✅ Automatic Google Meet Links
- **Unique meeting IDs** generated for each booking
- **Direct meeting access** via generated links
- **Professional meeting URLs**

### ✅ Email Notifications
- **Instant notifications** to company email
- **Customer confirmations** with meeting details
- **Multiple email service support**

### ✅ Calendar Integration
- **Google Calendar links** generated automatically
- **Meeting details** included in calendar events
- **One-click calendar addition**

### ✅ Professional UI
- **Beautiful form design** with animations
- **Responsive layout** for all devices
- **Success messages** with meeting links
- **Loading states** during processing

### ✅ Form Validation
- **Required field validation**
- **Email format validation**
- **Time/date selection validation**
- **Error handling** with user feedback

## 🔗 Integration with Main Website

To integrate this with your main website:

1. **Add to main HTML**:
   ```html
   <script src="email-integration.js"></script>
   ```

2. **Update demo button** in navbar:
   ```html
   <button onclick="window.open('demo-booking.html', '_blank')">
       <i class="fas fa-calendar-alt"></i>
       Get Demo
   </button>
   ```

3. **Or embed the form** directly in your main page

## 📱 Mobile Responsive

The form is fully responsive and works perfectly on:
- **Desktop computers**
- **Tablets**
- **Mobile phones**
- **All screen sizes**

## 🎨 Customization

### Colors
Update the CSS variables in `demo-booking-styles.css`:
```css
:root {
    --primary-color: #4DD0E1;
    --secondary-color: #1C7C82;
    --text-color: #333;
}
```

### Email Templates
Customize the email templates in your chosen email service:
- **EmailJS**: Edit templates in dashboard
- **Formspree**: Customize email templates
- **Web3Forms**: Use custom HTML templates

## 🚀 Testing

1. **Open** `demo-booking.html` in browser
2. **Fill out** the form with test data
3. **Submit** and check:
   - Console logs for email sending
   - Your email for notifications
   - Generated Google Meet link

## 📞 Support

If you need help setting up:
1. **Check console logs** for error messages
2. **Verify email service configuration**
3. **Test with different email services**
4. **Contact support** if issues persist

## 🎯 Next Steps

1. **Choose email service** (EmailJS recommended)
2. **Set up templates** with your branding
3. **Test the system** with real bookings
4. **Integrate with main website**
5. **Monitor bookings** and responses

---

**Ready to go live!** 🚀 Your demo booking system will automatically handle all bookings and send Google Meet links to both you and your customers!
