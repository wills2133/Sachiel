import { Profile } from "./profile";

export interface Activity {
  'id': string;
  'title': string;
  'date': Date | null;
  'description': string;
  'venue': string;
  'city': string;
  'category': string;
  'hostUserName': string;
  'isCancelled': boolean;
  'attendees'?: Profile[];
}