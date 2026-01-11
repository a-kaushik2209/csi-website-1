import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'PrathamGupta06',
      name: 'csi-website',
    },
  },
  collections: {
    sponsors: collection({
      label: 'Sponsors',
      slugField: 'name',
      path: 'src/content/sponsors/*',
      format: { contentField: 'description' },
      schema: {
        name: fields.slug({ name: { label: 'Sponsor Name' } }),
        website: fields.url({ label: 'Website URL' }),
        logo: fields.url({
          label: 'Logo URL',
          description: 'Cloudinary or external image URL for the sponsor logo',
        }),
        tier: fields.select({
          label: 'Sponsor Tier',
          options: [
            { label: 'Platinum', value: 'platinum' },
            { label: 'Gold', value: 'gold' },
            { label: 'Silver', value: 'silver' },
            { label: 'Bronze', value: 'bronze' },
          ],
          defaultValue: 'silver',
        }),
        displayOrder: fields.number({
          label: 'Display Order',
          defaultValue: 0,
        }),
        description: fields.document({
          label: 'Description',
          formatting: true,
          links: true,
        }),
      },
    }),
    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'src/content/events/*',
      format: { contentField: 'description' },
      schema: {
        title: fields.slug({ name: { label: 'Event Title' } }),
        eventDate: fields.date({
          label: 'Event Date',
          validation: { isRequired: true },
        }),
        eventTime: fields.text({
          label: 'Event Time',
          defaultValue: '10:00',
        }),
        location: fields.text({
          label: 'Location',
          validation: { isRequired: true },
        }),
        coverImage: fields.url({
          label: 'Cover Image URL',
          description: 'Cloudinary or external image URL for the event cover',
        }),
        excerpt: fields.text({
          label: 'Short Description',
          multiline: true,
        }),
        registrationLink: fields.url({
          label: 'Registration Link (Optional)',
        }),
        galleryTag: fields.text({
          label: 'Cloudinary Gallery Tag',
          description: 'Tag for fetching event photos from Cloudinary (e.g., "techfest-2025")',
        }),
        featured: fields.checkbox({
          label: 'Featured Event',
          defaultValue: false,
        }),
        description: fields.document({
          label: 'Full Description',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/events',
            publicPath: '/images/events/',
          },
        }),
      },
    }),
    team: collection({
      label: 'Team Members',
      slugField: 'name',
      path: 'src/content/team/*',
      format: { contentField: 'bio' },
      schema: {
        name: fields.slug({ name: { label: 'Full Name' } }),
        role: fields.text({
          label: 'Role/Position',
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Faculty Coordinators', value: 'faculty' },
            { label: 'Founding Members', value: 'founding' },
            { label: 'Advisors', value: 'advisors' },
            { label: 'Core Team', value: 'core' },
            { label: 'Technical Team', value: 'technical' },
            { label: 'Event Management', value: 'event-management' },
            { label: 'Public Relations', value: 'public-relations' },
            { label: 'Social Media & Photography', value: 'social-media' },
            { label: 'Content', value: 'content' },
            { label: 'Logistics & Hospitality', value: 'logistics' },
          ],
          defaultValue: 'core',
        }),
        photo: fields.url({
          label: 'Photo URL',
          description: 'Cloudinary or external image URL for the profile photo',
        }),
        linkedIn: fields.url({
          label: 'LinkedIn Profile',
        }),
        displayOrder: fields.number({
          label: 'Display Order',
          defaultValue: 0,
        }),
        bio: fields.document({
          label: 'Bio (Optional)',
          formatting: true,
        }),
      },
    }),
    gallery: collection({
      label: 'Gallery Events',
      slugField: 'eventName',
      path: 'src/content/gallery/*',
      schema: {
        eventName: fields.slug({ name: { label: 'Event Name' } }),
        eventDate: fields.date({
          label: 'Event Date',
          validation: { isRequired: true },
        }),
        cloudinaryTag: fields.text({
          label: 'Cloudinary Tag',
          description: 'Tag used to fetch photos from Cloudinary (e.g., "gallery-techfest-2025")',
          validation: { isRequired: true },
        }),
        coverImage: fields.url({
          label: 'Cover Image URL',
          description: 'Cloudinary or external image URL for the gallery cover (optional)',
        }),
        description: fields.text({
          label: 'Event Description',
          multiline: true,
        }),
      },
    }),
  },
  singletons: {
    about: singleton({
      label: 'About Page',
      path: 'src/content/about',
      schema: {
        title: fields.text({
          label: 'Page Title',
          defaultValue: 'About CSI - Innowave',
        }),
        description: fields.document({
          label: 'Main Description',
          formatting: true,
          dividers: true,
          links: true,
        }),
        vision: fields.document({
          label: 'Vision',
          formatting: true,
        }),
        mission: fields.document({
          label: 'Mission',
          formatting: true,
        }),
        milestones: fields.array(
          fields.object({
            year: fields.text({ label: 'Year' }),
            title: fields.text({ label: 'Milestone Title' }),
            description: fields.text({
              label: 'Description',
              multiline: true,
            }),
          }),
          {
            label: 'Milestones',
            itemLabel: (props) => props.fields.title.value || 'Milestone',
          }
        ),
        stats: fields.array(
          fields.object({
            number: fields.text({ label: 'Number' }),
            label: fields.text({ label: 'Label' }),
          }),
          {
            label: 'Statistics',
            itemLabel: (props) => props.fields.label.value || 'Stat',
          }
        ),
      },
    }),
  },
});
