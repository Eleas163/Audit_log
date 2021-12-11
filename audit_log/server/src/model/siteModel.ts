import { model, Model, Query, Schema } from 'mongoose';
import { ISite } from '../interfaces/ISite';

interface ISiteModel extends Model<ISite> {}

const siteSchema: Schema = new Schema<ISite>({
  name: {
    type: String,
    required: [true, 'Site name required']
  },

  city: {
    type: String,
    required: [true, 'city required']
  },

  description: {
    type: String,
    required: [true, 'Site description required']
  },

  latitude: {
    type: Number,
    required: [true, 'latitude required']
  },
  longitude: {
    type: Number,
    required: [true, 'longitude required']
  },
  auditLog: [
    {
      operation: {
        type: String,
        enum: ['Created', 'Updated'],
        default: 'Created'
      },

      nickname: {
        type: String,
        required: [true, 'Audit nickname required']
      },

      date: {
        type: Date,
        required: [true, 'audit date and time required'],
        default: new Date()
      }
    }
  ]
});

// siteSchema.pre<Query<ISite, ISite>>('findOneAndUpdate', async function () {
//   const currentSite: ISite = await this.model.findOne(this.getQuery());
//   console.log();
// });

const Site = model<ISite, ISiteModel>('Site', siteSchema);

export default Site;
