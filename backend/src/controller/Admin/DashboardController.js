import User from "../../models/User.js";
import Asset from "../../models/Asset.js";
import Kyc from "../../models/Kyc.js";
import Kyb from "../../models/Kyb.js";
import { ResponseMessage } from "../../utils/ResponseMessage.js";
import { StatusCodes } from "http-status-codes";
import Category from '../../models/Category.js';
import Store from "../../models/Store.js";
import moment from "moment";

export const dashboardTiles = async (req, res) => {
  try {
    const totalUsersPipeline = [
      {
        $match: { isDeleted: false, isVerified: true, isActive: true }
      },
      {
        $lookup: {
          from: "kycs",
          localField: "_id",
          foreignField: "userId",
          as: "kycData"
        }
      },
      {
        $lookup: {
          from: "kybs",
          localField: "_id",
          foreignField: "userId",
          as: "kybData"
        }
      },
      {
        $match: {
          $and: [
            { "kycData.0": { $exists: true } },
            { "kybData.0": { $exists: true } }
          ]
        }
      },
      {
        $count: "totalUser"
      }
    ];

    const totalUserResult = await User.aggregate(totalUsersPipeline);
    const totalUser = totalUserResult.length > 0 ? totalUserResult[0].totalUser : 0;

    const totalAssests = await Asset.find({ isDeleted: false }).countDocuments();
    const totalPendingKyc = await Kyc.find({ kycStatus: "Pending" }).countDocuments();
    const totalPendingKyb = await Kyb.find({ kybStatus: "Pending" }).countDocuments();

    return res.status(200).json({
      status: StatusCodes.OK,
      message: ResponseMessage.DASHBAORD_TILES_FETCHED,
      data: {
        totalUser,
        totalAssests,
        totalPendingKyc,
        totalPendingKyb
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      data: error.message,
    });
  }
};

export const getWeeklyUserRegistrations = async (req, res) => {
  try {
    const endDate = moment().endOf('day').toDate();
    const startDate = moment().subtract(6, 'days').startOf('day').toDate();

    const pipeline = [
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $lookup: {
          from: 'kycs',
          localField: '_id',
          foreignField: 'userId',
          as: 'kyc'
        }
      },
      {
        $lookup: {
          from: 'kybs',
          localField: '_id',
          foreignField: 'userId',
          as: 'kyb'
        }
      },
      {
        $match: {
          'kyc.0': { $exists: true },
          'kyb.0': { $exists: true }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          totalJoinedUser: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          totalJoinedUser: 1
        }
      }
    ];

    const results = await User.aggregate(pipeline);
    return res.status(200).json({
      status: StatusCodes.OK,
      message: ResponseMessage.WEEKLY_USER_REGISTRATION,
      data: results
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      data: error.message
    });
  }
};

export const getStoreListFromCategory = async(req,res) =>{
  try {
    const getAllCategory = await Category.find({isDeleted:false});

    const storeList = await Promise.all(getAllCategory.map(async(item)=>{
      const storeCount = await Store.find({category:item._id}).populate('category').countDocuments();
      return {
        categoryName : item.categoryName,
        totalStores : storeCount
      }
    }))

    if(storeList.length){
      return res.status(200).json({
        status: StatusCodes.OK,
        message: ResponseMessage.STORE_FROM_CATEGORY_FETCHED,
        data: storeList.filter((item)=>item.totalStores > 0)
      });
    } 
    else {
      return res.status(404).json({
        status: StatusCodes.NOT_FOUND,
        message: ResponseMessage.STORE_NOT_FOUND,
        data: []
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      data: error.message
    });
  }
}

