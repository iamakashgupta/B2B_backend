const completeTrade = async (req, res) => {
    try {
      const trade = await Trade.findById(req.params.id);
      
      // Update eco points for both users
      await User.findByIdAndUpdate(trade.proposer, {
        $inc: { tradeCount: 1, ecoPoints: 10 }
      });
      
      await User.findByIdAndUpdate(trade.recipient, {
        $inc: { tradeCount: 1, ecoPoints: 10 }
      });
  
      // Mark trade as completed
      const updatedTrade = await Trade.findByIdAndUpdate(
        req.params.id,
        { status: 'completed' },
        { new: true }
      );
  
      res.status(200).json(updatedTrade);
    } catch (error) {
      res.status(400).json({ message: 'Trade completion failed' });
    }
  };

  