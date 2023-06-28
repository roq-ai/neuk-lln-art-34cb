import axios from 'axios';
import queryString from 'query-string';
import { ArtLocationInterface, ArtLocationGetQueryInterface } from 'interfaces/art-location';
import { GetQueryInterface } from '../../interfaces';

export const getArtLocations = async (query?: ArtLocationGetQueryInterface) => {
  const response = await axios.get(`/api/art-locations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createArtLocation = async (artLocation: ArtLocationInterface) => {
  const response = await axios.post('/api/art-locations', artLocation);
  return response.data;
};

export const updateArtLocationById = async (id: string, artLocation: ArtLocationInterface) => {
  const response = await axios.put(`/api/art-locations/${id}`, artLocation);
  return response.data;
};

export const getArtLocationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/art-locations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteArtLocationById = async (id: string) => {
  const response = await axios.delete(`/api/art-locations/${id}`);
  return response.data;
};
