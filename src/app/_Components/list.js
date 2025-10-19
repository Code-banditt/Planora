"use client";

import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";

export function List({ data }) {
  return (
    <Card className="w-96">
      <CardBody>
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Latest Customers
          </Typography>
          <Typography
            as="a"
            href="#"
            variant="small"
            color="blue"
            className="font-bold"
          >
            View all
          </Typography>
        </div>
        <div className="divide-y divide-gray-200">
          {data?.map((appt, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 last:pb-0"
            >
              <div className="flex items-center gap-x-3">
                {appt?.client?.image ? (
                  // ✅ Show Avatar with image
                  <Avatar
                    src={appt.client.image}
                    alt={appt.client.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  // ✅ Fallback: initials in a div
                  <div className="bg-green-500 text-white font-semibold w-8 h-8 flex items-center justify-center rounded-full">
                    {appt?.client?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>
                )}

                <div>
                  <Typography color="blue-gray" variant="h6">
                    {appt?.client.name}
                  </Typography>
                  <Typography variant="small" color="gray">
                    {appt?.client.email}
                  </Typography>
                </div>
              </div>
              <Typography color="blue-gray" variant="h6">
                ${appt?.payment?.amount}
              </Typography>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
