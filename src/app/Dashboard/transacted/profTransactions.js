"use client";

import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { useAppointments } from "@/app/reactQueryCalls/useAppointments";
import ProgressBar from "@/app/_Components/loadingProgress";

const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account", ""];

export function ProfTransactionsTable() {
  const { data: appointments, isLoading } = useAppointments();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <Typography>
          <ProgressBar />
        </Typography>
      </div>
    );
  }

  return (
    <Card className="h-full w-full px-4 py-2">
      <CardHeader className="rounded-none shadow-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Transactions
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last transactions
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                className="py-2 px-2"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {appointments?.map((appt, index) => {
              const isLast = index === appointments.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={appt._id}>
                  {/* Transaction (client + service) */}
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={`https://ui-avatars.com/api/?name=${appt.client.name}`}
                        alt={appt.client.name}
                        size="md"
                        className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                      />
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {appt.client.name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          {appt.service}
                        </Typography>
                      </div>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {appt.payment.amount} {appt.payment.currency}
                    </Typography>
                  </td>

                  {/* Date */}
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Date(appt.date).toLocaleString()}
                    </Typography>
                  </td>

                  {/* Status */}
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={appt.payment.status}
                        color={
                          appt.payment.status === "paid"
                            ? "green"
                            : appt.payment.status === "pending"
                            ? "amber"
                            : "red"
                        }
                      />
                    </div>
                  </td>

                  {/* Account (method) */}
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal capitalize"
                    >
                      {appt.payment.method}
                    </Typography>
                  </td>

                  {/* Actions */}
                  <td className={classes}>
                    <Tooltip content="Edit Transaction">
                      <IconButton variant="text">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
