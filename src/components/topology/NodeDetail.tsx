import React from "react"

export type NodeDetailData = {
  accessibility_by_network_element__ping_status: string
  accessibility_by_network_element__snmp_config__name: string
  accessibility_by_network_element__telnet_status: string
  ci_no: number
  city__name: string
  county_name: string
  domain: string
  ip_address: string
  is_deleted: boolean
  latitude: string
  longitude: string
  mezura_snmp_version: string
  name: string
  onent_status: string
  service__name: string
  site_location__site_code: string
  snmp_community: string
  source_system: string
  sub_domain: string
  sub_region__name: string
  vendor: string
}

export type NodeDetailProps = {
  data?: NodeDetailData
  isVisible: boolean
  isLoading: boolean
}

export const NodeDetail = (props: NodeDetailProps): React.ReactElement => {
  const { data, isVisible, isLoading } = props

  if (!isVisible) {
    return <></>
  }

  return (
    <div
      style={{
        position: "absolute",
        right: "10px",
        backgroundColor: "white",
        border: "1px solid black",
        padding: "4px 8px 4px 8px",
        maxWidth: "250px",
      }}
    >
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <h3>Node Detail</h3>
          <h5>Name: {data?.name}</h5>
          <p>
            Ping Status: {data?.accessibility_by_network_element__ping_status}
          </p>
          <p>
            Snmp Config:{" "}
            {data?.accessibility_by_network_element__snmp_config__name}
          </p>
          <p>
            Telnet Status:{" "}
            {data?.accessibility_by_network_element__telnet_status}
          </p>
          <p>CI No: {data?.ci_no}</p>
          <p>City: {data?.city__name}</p>
          <p>County: {data?.county_name}</p>
          <p>Domain: {data?.domain}</p>
          <p>IP Address: {data?.ip_address}</p>
          <p>Latitude: {data?.latitude}</p>
          <p>Longitude: {data?.longitude}</p>
          <p>OneNT Statıus: {data?.onent_status}</p>
          <p>Service: {data?.service__name}</p>
          <p>Sub Domain: {data?.sub_domain}</p>
          <p>Sub Region: {data?.sub_region__name}</p>
          <p>Vendor: {data?.vendor}</p>
        </>
      )}
    </div>
  )
}
