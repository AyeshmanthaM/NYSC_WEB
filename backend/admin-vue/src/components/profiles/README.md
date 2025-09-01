# Profile Form Components

This directory contains a complete Profile Form implementation with photo upload and comprehensive backend validation handling.

## Components Overview

### 1. `ProfileFormComplete.vue`
The main form component that handles all profile creation/editing with the following features:

#### ✅ **Form Submission & Backend Response**
- Form remains open until backend response is received
- Loading states during submission
- No premature form closure

#### ✅ **Validation Error Handling**
- Fields highlighted in **red** on validation failure
- Inline error messages below problematic fields
- Form stays open with all values intact
- Automatic scrolling to first error field

#### ✅ **Server Error Handling**
- Popup error messages for server issues (not validation errors)
- Form remains open with existing values
- Dismissible error alerts with clean UX

#### ✅ **Success Flow**
- Green success message display
- Form closes/resets after success confirmation
- Parent component receives success notification

#### ✅ **Photo Upload Integration**
- Immediate upload on file selection
- Green **File ID** display on successful upload
- File ID stored in form state for submission
- Progress indicators and comprehensive error handling
- File validation (type, size limits)

#### ✅ **Cancel Cleanup**
- Automatically deletes uploaded photos when form is cancelled
- No orphaned files left in the system
- Proper state cleanup and memory management

### 2. `ProfileManagement.vue`
A complete admin panel page demonstrating how to integrate the form:
- Inline form loading (no separate pages)
- Dropdown for different director types
- Statistics dashboard
- Success/error message handling
- Sample data for testing

### 3. `ProfileManagementView.vue`
Router view wrapper for easy integration into existing Vue Router setup.

## Usage Examples

### Basic Usage
```vue
<template>
  <ProfileFormComplete
    :director-type="'director'"
    @success="handleSuccess"
    @cancel="handleCancel"
  />
</template>

<script setup>
import ProfileFormComplete from '@/components/profiles/ProfileFormComplete.vue'

const handleSuccess = (data) => {
  console.log('Profile created/updated:', data)
}

const handleCancel = () => {
  console.log('Form cancelled')
}
</script>
```

### Edit Mode Usage
```vue
<template>
  <ProfileFormComplete
    :director-type="'boardMember'"
    :profile-id="profileId"
    :initial-data="existingData"
    @success="handleSuccess"
    @cancel="handleCancel"
  />
</template>
```

### Integration in Existing Admin Panel
```vue
<template>
  <div class="admin-content">
    <!-- Your existing content -->
    <button @click="showForm = true">Add New Profile</button>
    
    <!-- Form loads inline -->
    <div v-if="showForm">
      <ProfileFormComplete
        :director-type="selectedType"
        @success="onFormSuccess"
        @cancel="showForm = false"
      />
    </div>
  </div>
</template>
```

## Props

### ProfileFormComplete Props
- `directorType` (required): `DirectorType` - Type of director profile
- `profileId` (optional): `string` - ID for editing existing profile
- `initialData` (optional): `Partial<DirectorData>` - Pre-populate form data

### Events Emitted
- `success`: Emitted when profile is successfully created/updated
  - Payload: `DirectorData` object
- `cancel`: Emitted when form is cancelled

## Director Types Supported
- `chairman` - Chairman with title, tenure, vision fields
- `boardMember` - Board Member with badge field
- `director` - Director with department, specialization
- `deputyDirector` - Deputy Director with department, provinces
- `assistantDirector` - Assistant Director with department, region
- `provincialDirector` - Provincial Director with province, headquarters
- `provincialAssistant` - Provincial Assistant with province, district
- `youthClubMember` - Youth Club Member with team role, age, skills

## API Endpoints Expected

### Photo Upload
- `POST /admin/api/directors/{directorType}/upload-image`
- Returns: `{ url: string, fileId: string }`

### Photo Cleanup
- `DELETE /admin/api/directors/uploads/{fileId}`

### Profile Management
- `POST /admin/api/directors/{directorType}` - Create profile
- `PUT /admin/api/directors/{directorType}/{id}` - Update profile
- `GET /admin/api/directors/{directorType}/{id}` - Get profile for editing

### Response Format
#### Success Response
```json
{
  "success": true,
  "data": { /* profile data */ }
}
```

#### Validation Error Response (400)
```json
{
  "success": false,
  "errors": {
    "name": "Name is required",
    "email": "Invalid email format"
  }
}
```

#### Server Error Response (500)
```json
{
  "success": false,
  "message": "Server error message"
}
```

## Styling

The components use Tailwind CSS with a clean, professional design:
- **Form Fields**: Clean borders, focus states, proper spacing
- **Validation Errors**: Red highlighting and inline error messages
- **Success States**: Green confirmation messages
- **Loading States**: Smooth progress indicators and loading spinners
- **Photo Upload**: Visual preview with progress tracking

## Testing

The `ProfileManagement.vue` component includes testing features:
1. **Sample Data Button**: Pre-fills form with realistic test data
2. **Validation Test Button**: Pre-fills with invalid data to test error handling
3. **Different Director Types**: Test dynamic form fields
4. **Photo Upload**: Test file upload workflow
5. **Cancel Cleanup**: Test orphaned file deletion

## Integration Steps

1. **Add to Router** (if using Vue Router):
```js
{
  path: '/admin/profiles',
  name: 'ProfileManagement',
  component: () => import('@/views/ProfileManagementView.vue')
}
```

2. **Add to Existing Page**:
```vue
<script setup>
import ProfileFormComplete from '@/components/profiles/ProfileFormComplete.vue'
</script>
```

3. **Handle Success/Cancel**:
```vue
const onSuccess = (data) => {
  // Refresh your data list
  // Show success message
  // Close form/modal
}
```

## Notes

- **No External Dependencies**: Uses only Vue 3, TypeScript, and Tailwind CSS
- **Fully Responsive**: Works on mobile and desktop
- **Accessible**: Proper ARIA labels, keyboard navigation, screen reader support
- **Type Safe**: Full TypeScript support with proper interfaces
- **Performance Optimized**: Efficient re-renders and memory management
- **Production Ready**: Comprehensive error handling and edge case management

## Troubleshooting

### Form Not Submitting
- Check that all required fields are filled
- Verify API endpoints are accessible
- Check browser network tab for errors

### Photo Upload Issues
- Ensure file is under 5MB
- Check supported formats (JPG, PNG, WebP)
- Verify upload endpoint is working

### Validation Not Showing
- Ensure backend returns proper error format
- Check that field names match between frontend and backend
- Verify error handling in console

### Style Issues
- Ensure Tailwind CSS is properly configured
- Check that all required Tailwind classes are available
- Verify component imports are correct