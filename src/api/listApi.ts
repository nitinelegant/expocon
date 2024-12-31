import { axiosInstance } from "@/lib/axios";
import {
  AssociationsListResponse,
  CompanyListResponse,
  ConferenceListResponse,
  ExpConferenceListResponse,
  KeyContactDeleteCredential,
  KeyContactDeleteResponse,
  KeyContactListResponse,
  StaffListResponse,
  VenueListResponse,
} from "@/types/listTypes";

export const listApi = {
  getVenues: async (): Promise<VenueListResponse> => {
    try {
      const response = await axiosInstance.get<VenueListResponse>(
        "/venue/list?limit=50"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getAssociation: async (): Promise<AssociationsListResponse> => {
    try {
      const response = await axiosInstance.get<AssociationsListResponse>(
        "/association/list?limit=50"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getCompanies: async (): Promise<CompanyListResponse> => {
    try {
      const response = await axiosInstance.get<CompanyListResponse>(
        "/company/list"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getKeyContact: async (): Promise<KeyContactListResponse> => {
    try {
      const response = await axiosInstance.get<KeyContactListResponse>(
        "/keycontact/list"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getConference: async (): Promise<ConferenceListResponse> => {
    try {
      const response = await axiosInstance.get<ConferenceListResponse>(
        "/conference/list"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getExpConference: async (): Promise<ExpConferenceListResponse> => {
    try {
      const response = await axiosInstance.get<ExpConferenceListResponse>(
        "/conference/expired"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  getStaff: async (): Promise<StaffListResponse> => {
    try {
      const response = await axiosInstance.get<StaffListResponse>(
        "/staff/list"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data");
    }
  },
  deleteKeyContact: async (
    id: KeyContactDeleteCredential
  ): Promise<KeyContactDeleteResponse> => {
    try {
      const response = await axiosInstance.delete<KeyContactDeleteResponse>(
        `/keycontact/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while logging in");
    }
  },
};
