# leyrekō Portfolio - API Contracts & Backend Integration Plan

## Overview
This document outlines the API contracts and integration plan for converting the leyrekō portfolio from mock data to full-stack functionality.

## Current Frontend Mock Data
- Portfolio projects organized by categories (UA, ASO, Social Media, Branding)
- Contact form with gaming-themed messaging
- User interface with dark, modern gaming aesthetic
- Video reel with audio controls

## Backend Requirements

### 1. Contact Form API
**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "string",
  "email": "string", 
  "subject": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quest message received! We'll get back to you soon."
}
```

**Functionality:**
- Store contact submissions in MongoDB
- Send email notification to portfolio owner
- Return gaming-themed success message
- Validate email format and required fields

### 2. Portfolio Data API (Optional Enhancement)
**Endpoint:** `GET /api/portfolio/{category}`

**Response:**
```json
{
  "category": "ua|aso|social|branding",
  "projects": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "tools": ["string"],
      "metrics": {
        "key": "value"
      },
      "image_url": "string",
      "ip": "string"
    }
  ]
}
```

## Database Schema

### Contact Submissions Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String, 
  message: String,
  created_at: Date,
  status: String // "new", "read", "replied"
}
```

### Portfolio Projects Collection (Future Enhancement)
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String, // "ua", "aso", "social", "branding"
  tools: [String],
  metrics: Object,
  image_url: String,
  ip: String,
  order: Number,
  featured: Boolean,
  created_at: Date
}
```

## Integration Steps

### Phase 1: Contact Form Backend
1. Create FastAPI endpoint for contact form submission
2. Add MongoDB model for contact submissions
3. Implement email notification system
4. Update frontend to use real API instead of mock toast

### Phase 2: Portfolio Management (Optional)
1. Create admin interface for managing portfolio projects
2. Implement CRUD operations for projects
3. Add image upload functionality
4. Update frontend to fetch dynamic portfolio data

## Environment Variables Needed
```
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
CONTACT_EMAIL=your-contact@email.com

# MongoDB (already configured)
MONGO_URL=existing-value
DB_NAME=existing-value
```

## Frontend Changes Required

### Contact Form Integration
**File:** `/app/frontend/src/components/Portfolio.js`

**Current Mock Code:**
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  toast({
    title: "Message Sent! 🎮",
    description: "Thanks for reaching out! I'll get back to you soon!",
  });
  setFormData({ name: '', email: '', subject: '', message: '' });
};
```

**Updated Integration Code:**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${API}/contact`, formData);
    toast({
      title: "Message Sent! 🎮", 
      description: response.data.message,
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  } catch (error) {
    toast({
      title: "Quest Failed! ❌",
      description: "Something went wrong. Please try again.",
      variant: "destructive"
    });
  }
};
```

## WordPress Compatibility Notes
- All CSS classes use WordPress-friendly naming conventions
- Components are structured for easy PHP template conversion
- Modern card system can be converted to WordPress blocks
- Dark theme variables can be integrated with WordPress customizer

## Testing Checklist
- [ ] Contact form submits successfully
- [ ] Email notifications are sent
- [ ] Data is stored in MongoDB
- [ ] Form validation works properly
- [ ] Success/error messages display correctly
- [ ] Gaming aesthetic is maintained throughout

## Future Enhancements
1. **Admin Dashboard** - Manage portfolio projects and view contact submissions
2. **Image Upload** - Add real project images and screenshots
3. **Analytics** - Track portfolio views and contact form submissions
4. **Social Integration** - Connect with Instagram and LinkedIn APIs
5. **Blog System** - Add gaming industry insights and project case studies

## WordPress Migration Strategy
1. Convert React components to PHP templates
2. Implement WordPress REST API endpoints
3. Create custom post types for portfolio projects
4. Add WordPress admin interface for content management
5. Maintain dark gaming aesthetic with WordPress theme system